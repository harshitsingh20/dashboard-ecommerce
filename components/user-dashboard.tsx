"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, Globe, MapPin, UserIcon } from "lucide-react"

interface UserData {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  phone: string
  website: string
  company: {
    name: string
  }
}

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export default function UserDashboard() {
  const [users, setUsers] = useState<UserData[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [postsLoading, setPostsLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, [])

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }, [users, searchTerm])

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const handleUserClick = (user: UserData) => {
    setSelectedUser(user)
    setPostsLoading(true)
    const userSpecificPosts = posts.filter((post) => post.userId === user.id)
    setUserPosts(userSpecificPosts)
    setPostsLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">View and manage all users and their posts</p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users by name, email, or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleUserClick(user)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  {/* Updated to use UserIcon instead of User */}
                  <UserIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{user.name}</CardTitle>
                  <CardDescription className="truncate">@{user.username}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{user.address.city}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span className="truncate">{user.website}</span>
              </div>
              <Badge variant="secondary" className="w-fit">
                {user.company.name}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found matching "{searchTerm}"</p>
        </div>
      )}

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {/* Updated to use UserIcon instead of User */}
              <UserIcon className="w-5 h-5 text-primary" />
              <span>Posts by {selectedUser?.name}</span>
            </DialogTitle>
            <DialogDescription>
              All posts created by {selectedUser?.name} (@{selectedUser?.username})
            </DialogDescription>
          </DialogHeader>

          {postsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {userPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.body}</p>
                  </CardContent>
                </Card>
              ))}
              {userPosts.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No posts found for this user.</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
