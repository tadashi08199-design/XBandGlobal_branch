import { LandingExperience } from "@/components/marketing/LandingExperience"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function LandingPage() {
    const supabase = await createServerSupabaseClient()
    let metrics = {
        activeCountries: 0,
        verifiedProviders: 0,
        publishedReviews: 0,
    }

    try {
        const [activeCountriesCountResult, verifiedProvidersCountResult, publishedReviewsCountResult] = await Promise.all([
            supabase
                .from("countries")
                .select("id", { count: "exact", head: true })
                .eq("is_active", true),
            supabase
                .from("providers")
                .select("id", { count: "exact", head: true })
                .eq("status", "verified"),
            supabase
                .from("reviews")
                .select("id", { count: "exact", head: true }),
        ])

        metrics = {
            activeCountries: activeCountriesCountResult.count ?? 0,
            verifiedProviders: verifiedProvidersCountResult.count ?? 0,
            publishedReviews: publishedReviewsCountResult.count ?? 0,
        }
    } catch (error) {
        console.error("Failed to load landing metrics", error)
    }

    return <LandingExperience metrics={metrics} />
}