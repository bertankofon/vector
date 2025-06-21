"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Search, Database, FlaskConical } from "lucide-react"

export default function MaterialsProjectApp() {
  const [apiKey, setApiKey] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Materials Project API key")
      return
    }

    if (!searchQuery.trim()) {
      setError("Please enter a search query")
      return
    }

    setLoading(true)
    setError("")

    try {
      // This will be implemented with actual API calls
      // For now, simulating API response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock response for demonstration
      setResults({
        materials: [
          {
            material_id: "mp-149",
            formula: "Si",
            spacegroup: "Fd-3m",
            energy_per_atom: -5.425,
            band_gap: 1.155,
          },
          {
            material_id: "mp-66",
            formula: "GaAs",
            spacegroup: "F-43m",
            energy_per_atom: -3.456,
            band_gap: 1.429,
          },
        ],
      })
    } catch (err) {
      setError("Failed to fetch data from Materials Project API")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/vector-logo-new.png" alt="Vector" className="h-24" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            powered by{" "}
            <a
              href="https://api.materialsproject.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-teal-600 hover:text-teal-700 hover:underline"
            >
              Materials Project API
            </a>
            {" • "}
            built by{" "}
            <a
              href="https://www.linkedin.com/in/yusuf-ziya-demirba%C5%9F-0a94271b7/?originalSubdomain=tr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 hover:text-gray-900 hover:underline"
            >
              Y. Z. Demirbas
            </a>
            {", "}
            <a
              href="https://www.linkedin.com/in/bertankofon/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 hover:text-gray-900 hover:underline"
            >
              B. Kofon
            </a>
          </p>
        </div>

        {/* API Key Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Enter your Materials Project API key to access the database. Get your free API key at{" "}
              <a
                href="https://materialsproject.org"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                materialsproject.org
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your Materials Project API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Badge variant={apiKey ? "default" : "secondary"}>{apiKey ? "Connected" : "Not Connected"}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Interface */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Material Search
            </CardTitle>
            <CardDescription>Search for materials by formula, material ID, or chemical system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="formula" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="formula">Formula</TabsTrigger>
                <TabsTrigger value="material-id">Material ID</TabsTrigger>
                <TabsTrigger value="system">Chemical System</TabsTrigger>
              </TabsList>

              <TabsContent value="formula" className="space-y-4">
                <div>
                  <Label htmlFor="formula-search">Chemical Formula</Label>
                  <Input
                    id="formula-search"
                    placeholder="e.g., Si, GaAs, Li2O"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="material-id" className="space-y-4">
                <div>
                  <Label htmlFor="id-search">Material ID</Label>
                  <Input
                    id="id-search"
                    placeholder="e.g., mp-149, mp-66"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="system" className="space-y-4">
                <div>
                  <Label htmlFor="system-search">Chemical System</Label>
                  <Input
                    id="system-search"
                    placeholder="e.g., Li-O, Ga-As"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end mt-4">
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Materials
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Display */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                Search Results
              </CardTitle>
              <CardDescription>Found {results.materials?.length || 0} materials matching your search</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {results.materials?.map((material, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Material ID</Label>
                          <p className="font-mono text-sm">{material.material_id}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Formula</Label>
                          <p className="font-semibold">{material.formula}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Space Group</Label>
                          <p>{material.spacegroup}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Band Gap (eV)</Label>
                          <p>{material.band_gap}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Download Structure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Vector • Powered by the Materials Project API</p>
        </div>
      </div>
    </div>
  )
}
