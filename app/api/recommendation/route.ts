import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!)

// Simple rules-based recommendation logic
function getRecommendation(age: number, income: number, dependents: number, riskTolerance: "low" | "medium" | "high") {
  let type = "Term Life"
  let coverage = "$250,000"
  let term = "10 years"
  let explanation = "Based on your basic profile, a foundational term life policy is recommended."

  if (age < 30) {
    coverage = "$500,000"
    term = "30 years"
    explanation =
      "As you are young, a longer term and higher coverage term life policy is recommended to secure your future at a lower premium, providing ample protection for potential future responsibilities."
  } else if (age >= 30 && age < 50) {
    if (dependents > 0) {
      coverage = "$750,000"
      term = "20 years"
      explanation =
        "With dependents, a substantial term life policy is crucial to protect your family financially, ensuring their well-being in your absence."
    } else {
      coverage = "$400,000"
      term = "15 years"
      explanation =
        "A moderate term life policy is suggested to cover potential future needs and provide a safety net without excessive premiums."
    }
  } else {
    // age >= 50
    type = "Whole Life"
    coverage = "$1,000,000"
    term = "Lifetime"
    explanation =
      "For your age, a whole life policy provides lifelong coverage and can build cash value, offering stability and a legacy for your beneficiaries."
  }

  // Adjust coverage based on income
  if (income > 100000) {
    const currentCoverageValue = Number.parseInt(coverage.replace("$", "").replace(",", ""))
    coverage = `$${Math.round((currentCoverageValue * 1.5) / 1000) * 1000}` // Increase coverage by 50%, round to nearest thousand
    explanation +=
      " Your higher income suggests a need for greater financial protection to maintain your family's lifestyle."
  }

  // Adjust type based on risk tolerance
  if (riskTolerance === "high") {
    type = "Term Life" // High risk tolerance might prefer lower premium term life
    explanation +=
      " Your high risk tolerance aligns well with the cost-effectiveness and flexibility of term life insurance, allowing you to invest the savings elsewhere."
  } else if (riskTolerance === "low") {
    type = "Whole Life" // Low risk tolerance might prefer stability of whole life
    explanation +=
      " Your low risk tolerance makes a whole life policy, with its stable benefits, guaranteed cash value growth, and lifelong coverage, a suitable choice for peace of mind."
  }

  return {
    recommended_type: type,
    recommended_coverage: coverage,
    recommended_term: term,
    explanation: explanation,
    recommendation: `${type} – ${coverage} for ${term}`,
  }
}

export async function POST(req: NextRequest) {
  try {
    const { age, income, dependents, riskTolerance } = await req.json()

    // Basic validation
    if (
      typeof age !== "number" ||
      typeof income !== "number" ||
      typeof dependents !== "number" ||
      !["low", "medium", "high"].includes(riskTolerance)
    ) {
      return NextResponse.json({ error: "Invalid input data." }, { status: 400 })
    }

    const { recommended_type, recommended_coverage, recommended_term, explanation, recommendation } = getRecommendation(
      age,
      income,
      dependents,
      riskTolerance,
    )

    // Store submission in PostgreSQL
    await sql`
      INSERT INTO recommendations (age, income, num_dependents, risk_tolerance, recommended_type, recommended_coverage, recommended_term, explanation)
      VALUES (${age}, ${income}, ${dependents}, ${riskTolerance}, ${recommended_type}, ${recommended_coverage}, ${recommended_term}, ${explanation});
    `

    return NextResponse.json({ recommendation, explanation })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}
