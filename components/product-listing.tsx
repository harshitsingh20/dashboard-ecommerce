"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("default")
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, selectedCategory, sortBy])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, sortBy])

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        // Keep original order
        break
    }

    setFilteredProducts(filtered)
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "men's clothing": "bg-blue-100 text-blue-800",
      "women's clothing": "bg-pink-100 text-pink-800",
      jewelery: "bg-yellow-100 text-yellow-800",
      electronics: "bg-green-100 text-green-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Product Catalog</h2>
          <p className="text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Order</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-square relative overflow-hidden bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <Badge className={`text-xs ${getCategoryColor(product.category)}`}>{product.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">
                    {product.rating.rate} ({product.rating.count})
                  </span>
                </div>
              </div>
              <CardTitle className="text-sm line-clamp-2 leading-tight">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("all")
              setSortBy("default")
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge className={`${getCategoryColor(selectedProduct.category)}`}>{selectedProduct.category}</Badge>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
                  ✕
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{selectedProduct.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{selectedProduct.rating.rate}</span>
                      </div>
                      <span className="text-muted-foreground">({selectedProduct.rating.count} reviews)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-4">{formatPrice(selectedProduct.price)}</div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1">Add to Cart</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
