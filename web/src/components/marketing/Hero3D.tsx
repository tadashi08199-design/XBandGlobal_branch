"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, PerspectiveCamera, useTexture } from "@react-three/drei"
import * as THREE from "three"

const EARTH_RADIUS = 2.08

function EarthSphere({ isMobile }: { isMobile: boolean }) {
  const { gl } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const globeRef = useRef<THREE.Mesh>(null)
  const cloudRef = useRef<THREE.Mesh>(null)
  const currentRotation = useRef(new THREE.Vector2(0.2, -0.92))
  const baseRotation = useRef(new THREE.Vector2(0.2, -0.92))
  const dragVelocity = useRef(new THREE.Vector2(0, 0))
  const isDragging = useRef(false)
  const lastPointer = useRef(new THREE.Vector2(0, 0))

  const [dayMap, normalMap, specularMap, cloudsMap] = useTexture([
    "/textures/earth/earth_day_2048.jpg",
    "/textures/earth/earth_normal_2048.jpg",
    "/textures/earth/earth_specular_2048.jpg",
    "/textures/earth/earth_clouds_1024.png",
  ])
  const globeSegments = isMobile ? 72 : 128
  const cloudSegments = isMobile ? 56 : 96

  const textures = useMemo(() => {
    const day = dayMap.clone()
    const normal = normalMap.clone()
    const specular = specularMap.clone()
    const clouds = cloudsMap.clone()

    day.colorSpace = THREE.SRGBColorSpace
    clouds.colorSpace = THREE.SRGBColorSpace

    for (const texture of [day, normal, specular, clouds]) {
      texture.anisotropy = isMobile ? 4 : 8
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = true
      texture.needsUpdate = true
    }

    return { day, normal, specular, clouds }
  }, [cloudsMap, dayMap, isMobile, normalMap, specularMap])

  useEffect(() => {
    const canvas = gl.domElement

    const onPointerDown = (event: PointerEvent) => {
      isDragging.current = true
      lastPointer.current.set(event.clientX, event.clientY)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging.current) return
      const deltaX = event.clientX - lastPointer.current.x
      const deltaY = event.clientY - lastPointer.current.y
      lastPointer.current.set(event.clientX, event.clientY)

      baseRotation.current.y += deltaX * 0.0052
      baseRotation.current.x += deltaY * 0.0038
      baseRotation.current.x = THREE.MathUtils.clamp(baseRotation.current.x, -0.38, 0.82)

      dragVelocity.current.set(deltaX * 0.00095, deltaY * 0.00072)
    }

    const endDrag = () => {
      isDragging.current = false
    }

    canvas.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", endDrag)
    window.addEventListener("pointercancel", endDrag)

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", endDrag)
      window.removeEventListener("pointercancel", endDrag)
    }
  }, [gl])

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime
    const damping = 6.2

    if (!isDragging.current) {
      baseRotation.current.y += dragVelocity.current.x * delta * 60
      baseRotation.current.x += dragVelocity.current.y * delta * 60
      baseRotation.current.x = THREE.MathUtils.clamp(baseRotation.current.x, -0.38, 0.82)
      dragVelocity.current.multiplyScalar(Math.pow(0.9, delta * 60))
    }

    const hoverX = isDragging.current ? 0 : state.pointer.y * 0.08
    const hoverY = isDragging.current ? 0 : state.pointer.x * 0.09

    const targetX = baseRotation.current.x + hoverX
    const targetY = baseRotation.current.y + hoverY

    currentRotation.current.x = THREE.MathUtils.damp(currentRotation.current.x, targetX, damping, delta)
    currentRotation.current.y = THREE.MathUtils.damp(currentRotation.current.y, targetY, damping, delta)

    if (groupRef.current) {
      groupRef.current.rotation.x = currentRotation.current.x
      groupRef.current.rotation.y = currentRotation.current.y
    }

    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.032
      globeRef.current.rotation.x = Math.sin(elapsed * 0.11) * 0.01
    }

    if (cloudRef.current && globeRef.current) {
      cloudRef.current.rotation.y = globeRef.current.rotation.y + elapsed * 0.004
      cloudRef.current.rotation.x = globeRef.current.rotation.x
    }
  })

  return (
    <group ref={groupRef} rotation={[0.2, -0.92, 0]}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[EARTH_RADIUS, globeSegments, globeSegments]} />
        <meshPhongMaterial
          map={textures.day}
          normalMap={textures.normal}
          normalScale={new THREE.Vector2(0.68, 0.68)}
          specularMap={textures.specular}
          specular="#90a9c4"
          shininess={24}
          emissive="#071326"
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh ref={cloudRef}>
        <sphereGeometry args={[EARTH_RADIUS + 0.012, cloudSegments, cloudSegments]} />
        <meshPhongMaterial
          map={textures.clouds}
          alphaMap={textures.clouds}
          transparent
          opacity={0.16}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  )
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.34} />
      <hemisphereLight color="#d3e4ff" groundColor="#0a1220" intensity={0.46} />
      <directionalLight position={[5.8, 2.2, 4.6]} intensity={1.65} color="#f8fbff" />
      <directionalLight position={[-4.4, -1.8, -3.1]} intensity={0.42} color="#8fb2d6" />
      <pointLight position={[0, 0, 3.2]} intensity={0.28} color="#94bcde" />
      <Environment preset="studio" />
    </>
  )
}

export function Hero3D() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)")
    const apply = () => setIsMobile(media.matches)
    apply()

    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ cursor: "grab", touchAction: "none" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.12
          gl.outputColorSpace = THREE.SRGBColorSpace
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7.6]} fov={34} />
        <EarthSphere isMobile={isMobile} />
        <SceneLights />
      </Canvas>
    </div>
  )
}
