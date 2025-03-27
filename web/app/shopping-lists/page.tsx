"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Trash2, X, Bell, Globe, CheckCircle2 } from "lucide-react"

export default function ShoppingListPage() {
  const [activeStore, setActiveStore] = useState("all")
  const [items, setItems] = useState<any[]>([])
  const [stores, setStores] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false)
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isDeleteListDialogOpen, setIsDeleteListDialogOpen] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [newItem, setNewItem] = useState({ quantity: "", item: "", store: "Walmart" })
  const [userName, setUserName] = useState("")

  // Load data from localStorage on componant mount
  useEffect(() => {
    const savedUserName = localStorage.getItem("userName")
    if (savedUserName) {
      setUserName(savedUserName)
    } else {
      const defaultName = "Admin"
      setUserName(defaultName)
      localStorage.setItem("userName", defaultName)
    }

    const savedItems = localStorage.getItem("shoppingItems")
    const savedStores = localStorage.getItem("shoppingStores")

    // Only use initial data if nothing exists in local storage
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      // Initial shopping items data - only used on first visit
      const initialItems = [
        { id: 1, quantity: "1", item: "Pepperoni", store: "Walmart", checked: true },
      ]
      setItems(initialItems)
      localStorage.setItem("shoppingItems", JSON.stringify(initialItems))
    }

    if (savedStores) {
      setStores(JSON.parse(savedStores))
    } else {
      // Initial stores data - only used on first visit
      const initialStores = [
        { id: "all", name: "All" },
      ]
      setStores(initialStores)
      localStorage.setItem("shoppingStores", JSON.stringify(initialStores))
    }
  }, [])

  // Save data to local storage whenever it change
  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem("shoppingStores", JSON.stringify(stores))
  }, [stores])

  // Save user name to storage if it changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName)
    }
  }, [userName])

  // Toggle item checked state
  const toggleItem = (itemId: number) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item)))
  }

  // Filter items by store and search query
  const filteredItems = items.filter((item) => {
    const matchesStore = activeStore === "all" || item.store.toLowerCase() === activeStore.toLowerCase()
    const matchesSearch = item.item.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStore && matchesSearch
  })

  // Add new store
  const addNewList = () => {
    if (newListName.trim()) {
      const newStore = {
        id: newListName.toLowerCase().replace(/\s+/g, "-"),
        name: newListName,
      }
      setStores([...stores, newStore])
      setNewListName("")
      setIsAddListDialogOpen(false)
    }
  }

  // Add new item to active list
  const addNewItem = () => {
    if (newItem.item.trim() && newItem.quantity.trim()) {
      const newItemWithId = {
        id: Date.now(),
        ...newItem,
        checked: false,
      }
      setItems([...items, newItemWithId])
      setNewItem({ quantity: "", item: "", store: "Walmart" })
      setIsAddItemDialogOpen(false)
    }
  }

  // Delete current active list
  const deleteCurrentList = () => {
    if (activeStore !== "all") {
      const updatedStores = stores.filter((store) => store.id !== activeStore)
      setStores(updatedStores)

      const updatedItems = items.filter(
        (item) => item.store.toLowerCase() !== stores.find((s) => s.id === activeStore)?.name.toLowerCase(),
      )
      setItems(updatedItems)

      setActiveStore("all")
      setIsDeleteListDialogOpen(false)
    }
  }

  // Delete checked items
  const deleteCheckedItems = () => {
    setItems(items.filter((item) => !item.checked))
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <DashboardSidebar />

      <div className="ml-64">
        {/* Top Header */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input type="text" placeholder="Search" className="pl-10 rounded-full border-gray-200 bg-gray-50" />
            </div>

            <div className="flex items-center gap-6">
              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-200 rounded-full">
                    <Globe className="h-5 w-5 text-gray-600 mr-2" />
                    English
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Spanish</DropdownMenuItem>
                  <DropdownMenuItem>French</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 rounded-full hover:bg-gray-100">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <div className="flex gap-8">
            {/* Left Panel */}
            <div className="w-[280px]">
              <button
                className="w-full h-12 bg-[#42B5E7] text-white rounded-xl flex items-center justify-center mb-8 shadow-sm hover:bg-[#3AA1D1] transition-colors"
                onClick={() => setIsAddListDialogOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                <span className="font-medium">List</span>
              </button>

              <h2 className="text-xl font-semibold mb-6 text-gray-800">My Shopping List</h2>

              <div className="space-y-2">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => setActiveStore(store.id)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl transition-all ${
                      activeStore === store.id
                        ? "bg-blue-50 text-[#42B5E7] font-medium shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {store.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Search and Actions */}
              <div className="flex items-center justify-between mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search list"
                    className="pl-12 h-12 bg-gray-50 border-none rounded-xl text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setIsAddItemDialogOpen(true)}
                    className="h-12 px-5 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1]"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Item
                  </Button>

                  {activeStore !== "all" && (
                    <Button
                      onClick={() => setIsDeleteListDialogOpen(true)}
                      variant="outline"
                      className="h-12 px-5 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      <Trash2 className="w-5 h-5 mr-2" />
                      Delete List
                    </Button>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="grid grid-cols-[1fr,2fr,1fr] bg-gray-50">
                  <div className="px-6 py-4 text-sm font-medium text-gray-500">QUANTITY</div>
                  <div className="px-6 py-4 text-sm font-medium text-gray-500">ITEM</div>
                  <div className="px-6 py-4 text-sm font-medium text-gray-500">LIST</div>
                </div>
                <div>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1fr,2fr,1fr] border-t border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="px-6 py-5 flex items-center gap-4">
                          <div
                            onClick={() => toggleItem(item.id)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center cursor-pointer ${
                              item.checked ? "bg-[#42B5E7] text-white" : "border border-gray-300"
                            }`}
                          >
                            {item.checked && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                          <span className="text-base">{item.quantity}</span>
                        </div>
                        <div className="px-6 py-5">
                          <span
                            className={`text-base ${item.checked ? "line-through text-gray-400" : "text-gray-800"}`}
                          >
                            {item.item}
                          </span>
                        </div>
                        <div className="px-6 py-5">
                          <span className="px-4 py-1.5 text-sm rounded-full bg-[#E6F7F3] text-[#42B5E7] font-medium">
                            {item.store}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg">No items found</p>
                        <p className="text-sm text-gray-400">Add some items to your shopping list!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              {filteredItems.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={deleteCheckedItems}
                    variant="outline"
                    className="px-5 py-2.5 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Checked Items
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add List Dialog */}
      {isAddListDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsAddListDialogOpen(false)}></div>
          <div className="relative bg-white w-[450px] rounded-2xl shadow-lg">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Add New List</h2>
                <button
                  onClick={() => setIsAddListDialogOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">List Name</label>
                <Input
                  placeholder="e.g. Walmart, Costco, Target"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setIsAddListDialogOpen(false)}
                  variant="outline"
                  className="px-6 py-2.5 rounded-xl border-gray-200 text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addNewList}
                  className="px-6 py-2.5 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1]"
                >
                  Add List
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Dialog */}
      {isAddItemDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsAddItemDialogOpen(false)}></div>
          <div className="relative bg-white w-[500px] rounded-2xl shadow-lg">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Add New Item</h2>
                <button
                  onClick={() => setIsAddItemDialogOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <Input
                      placeholder="e.g. 1, 2kg, 500ml"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store</label>
                    <select
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#42B5E7] focus:border-transparent"
                      value={newItem.store}
                      onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
                    >
                      {stores
                        .filter((store) => store.id !== "all")
                        .map((store) => (
                          <option key={store.id} value={store.name}>
                            {store.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <Input
                    placeholder="e.g. Milk, Eggs, Bread"
                    value={newItem.item}
                    onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setIsAddItemDialogOpen(false)}
                  variant="outline"
                  className="px-6 py-2.5 rounded-xl border-gray-200 text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addNewItem}
                  className="px-6 py-2.5 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1]"
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete List Confirmation Dialog */}
      {isDeleteListDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsDeleteListDialogOpen(false)}></div>
          <div className="relative bg-white w-[450px] rounded-2xl shadow-lg">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Delete List</h2>
                <button
                  onClick={() => setIsDeleteListDialogOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-8">
                Are you sure you want to delete the "{stores.find((s) => s.id === activeStore)?.name}" list? This will
                remove all items associated with this list.
              </p>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setIsDeleteListDialogOpen(false)}
                  variant="outline"
                  className="px-6 py-2.5 rounded-xl border-gray-200 text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={deleteCurrentList}
                  className="px-6 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                  Delete List
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

