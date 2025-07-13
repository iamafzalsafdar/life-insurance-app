"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export default function LifeInsuranceForm() {
  const [age, setAge] = useState<number | string>("")
  const [income, setIncome] = useState<number | string>("")
  const [dependents, setDependents] = useState<number | string>("")
  const [riskTolerance, setRiskTolerance] = useState<"low" | "medium" | "high" | "">("")
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setRecommendation(null)
    setExplanation(null)

    if (!age || !income || !dependents || !riskTolerance) {
      setError("Please fill in all fields.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number(age),
          income: Number(income),
          dependents: Number(dependents),
          riskTolerance,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get recommendation.")
      }

      const data = await response.json()
      setRecommendation(data.recommendation)
      setExplanation(data.explanation)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Life Insurance Recommendation</CardTitle>
          <CardDescription>Enter your details to get a personalized life insurance recommendation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 35"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="18"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income ($)</Label>
              <Input
                id="income"
                type="number"
                placeholder="e.g., 75000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                placeholder="e.g., 2"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
              <Select
                value={riskTolerance}
                onValueChange={(value: "low" | "medium" | "high") => setRiskTolerance(value)}
                required
              >
                <SelectTrigger id="risk-tolerance">
                  <SelectValue placeholder="Select your risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Recommendation
            </Button>
          </form>

          {error && (
            <div className="text-red-500 text-sm text-center" aria-live="assertive">
              {error}
            </div>
          )}

          {recommendation && explanation && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Your Personalized Recommendation:</h3>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4">
                  <p className="text-xl font-bold text-primary">{recommendation}</p>
                </CardContent>
              </Card>
              <div className="space-y-2">
                <h4 className="text-md font-semibold">Explanation:</h4>
                <Textarea value={explanation} readOnly className="min-h-[100px] resize-none" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <p>Recommendations are for illustrative purposes only.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
