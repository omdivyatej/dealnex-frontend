"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, ChevronDown, ChevronUp } from "lucide-react"
import { Search, Link as IconLink, ArrowUpRight, RefreshCcw, Download, MoreHorizontal, Settings, Plus, BarChart2, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import React from "react"

interface DealDataItem {
  label: string
  value: string
  meta?: string
}

export default function DashboardPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [allDealsData, setAllDealsData] = useState<DealDataItem[][]>([])
  const [projectNames, setProjectNames] = useState<string[]>([])
  const [uniqueLabels, setUniqueLabels] = useState<string[]>([])
  const [expandedCells, setExpandedCells] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    const storedData = localStorage.getItem("allDealsData");
    if (storedData) {
      const parsed = JSON.parse(storedData) as DealDataItem[][];

      const projects: string[] = [];
      const cleanedDeals = parsed.map(deal => {
        const projectItem = deal.find(item => item.label.toLowerCase() === "project")
        if (projectItem) {
          projects.push(projectItem.value)
        } else {
          projects.push("Unknown")
        }
        return deal.filter(item => item.label.toLowerCase() !== "project")
      })

      setAllDealsData(cleanedDeals)
      setProjectNames(projects)

      const allLabels = new Set<string>()
      for (const deal of cleanedDeals) {
        for (const item of deal) {
          allLabels.add(item.label)
        }
      }
      setUniqueLabels(Array.from(allLabels))
    }
  }, [])

  const transactionCount = allDealsData.length

  const toggleCell = (rowIndex: number, dealIndex: number) => {
    const key = `${rowIndex}-${dealIndex}`
    setExpandedCells(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-48 bg-white border-r flex flex-col py-4">
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 bg-black flex items-center justify-center mr-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
            </svg>
          </div>
          <span className="font-semibold text-lg cursor-pointer" onClick={() => window.location.href = '/welcome-page'}>DealNex</span>
        </div>
        <div className="flex flex-col space-y-4">
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="justify-start w-full">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem className="font-semibold">GENERAL INFORMATION</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Deal Structure</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>Merger</DropdownMenuItem>
                  <DropdownMenuItem>Asset Purchase</DropdownMenuItem>
                  <DropdownMenuItem>Stock Purchase</DropdownMenuItem>
                  <DropdownMenuItem>Carve-out</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Industry Sector</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>Technology</DropdownMenuItem>
                  <DropdownMenuItem>Healthcare and Pharmaceuticals</DropdownMenuItem>
                  <DropdownMenuItem>Financial Services</DropdownMenuItem>
                  <DropdownMenuItem>Energy and Natural Resources</DropdownMenuItem>
                  <DropdownMenuItem>Consumer Goods and Retail</DropdownMenuItem>
                  <DropdownMenuItem>Industrial Manufacturing</DropdownMenuItem>
                  <DropdownMenuItem>Telecommunications</DropdownMenuItem>
                  <DropdownMenuItem>Media and Entertainment</DropdownMenuItem>
                  <DropdownMenuItem>Real Estate</DropdownMenuItem>
                  <DropdownMenuItem>Transportation and Logistics</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Buyer</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>A Corp</DropdownMenuItem>
                  <DropdownMenuItem>B Corp</DropdownMenuItem>
                  <DropdownMenuItem>C Corp</DropdownMenuItem>
                  <DropdownMenuItem>D Corp</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Seller</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>W Corp</DropdownMenuItem>
                  <DropdownMenuItem>X Corp</DropdownMenuItem>
                  <DropdownMenuItem>Y Corp</DropdownMenuItem>
                  <DropdownMenuItem>Z Corp</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Buyer's Counsel</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>Bankman Strauss LLP</DropdownMenuItem>
                  <DropdownMenuItem>GDRP LLP</DropdownMenuItem>
                  <DropdownMenuItem>Phillips, Weaver & Greenberg LLP</DropdownMenuItem>
                  <DropdownMenuItem>Weiss & Stone LLP</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Seller's Counsel</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>Nelson, Wallace, & Brooks LLP</DropdownMenuItem>
                  <DropdownMenuItem>Reed & Parker LLP</DropdownMenuItem>
                  <DropdownMenuItem>Barton, Pitts, Longman LLP</DropdownMenuItem>
                  <DropdownMenuItem>Manning & Schmidt LLP</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem className="font-semibold">FINANCIAL STRUCTURE</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Equity Contribution</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>0-25%</DropdownMenuItem>
                  <DropdownMenuItem>26-50%</DropdownMenuItem>
                  <DropdownMenuItem>51-75%</DropdownMenuItem>
                  <DropdownMenuItem>76-100%</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Leverage Structure</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>0-25% debt</DropdownMenuItem>
                  <DropdownMenuItem>26-50% debt</DropdownMenuItem>
                  <DropdownMenuItem>51-75% debt</DropdownMenuItem>
                  <DropdownMenuItem>76-100% debt</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem className="font-semibold">POST-CLOSING CONDITIONS</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Earnouts</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>Included</DropdownMenuItem>
                  <DropdownMenuItem>Not Included</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Management Incentives</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>Stock Options</DropdownMenuItem>
                  <DropdownMenuItem>Carried Interest</DropdownMenuItem>
                  <DropdownMenuItem>Performance Bonuses</DropdownMenuItem>
                  <DropdownMenuItem>Profit Sharing</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Non-Compete Agreements</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>1 year</DropdownMenuItem>
                  <DropdownMenuItem>2 years</DropdownMenuItem>
                  <DropdownMenuItem>3 years</DropdownMenuItem>
                  <DropdownMenuItem>5 years</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem className="font-semibold">CONTROL AND GOVERNANCE TERMS</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Board Composition</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>3 seats</DropdownMenuItem>
                  <DropdownMenuItem>4 seats</DropdownMenuItem>
                  <DropdownMenuItem>5 seats</DropdownMenuItem>
                  <DropdownMenuItem>6+ seats</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Drag-Along/Tag-Along Rights</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>Included</DropdownMenuItem>
                  <DropdownMenuItem>Not Included</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-4">Voting Rights</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem>Simple Majority</DropdownMenuItem>
                  <DropdownMenuItem>Supermajority</DropdownMenuItem>
                  <DropdownMenuItem>Unanimous Consent</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem><Plus className="w-4 h-4 mr-2" />More</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" className="justify-start">
            <BarChart2 className="w-5 h-5 mr-2 text-purple-600" />
            View
          </Button>
          <Button variant="ghost" className="justify-start">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" className="justify-start">
            <Plus className="w-5 h-5 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">M&A | {transactionCount} Transactions</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Input placeholder="Search..." className="w-64" />
            <Bell className="w-5 h-5 text-gray-500" />
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </header>

        <div className="bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Compare Transactions</h2>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>

        <div className="bg-white border-b p-4 flex items-center space-x-4">
          <Button variant="outline" size="sm" className="bg-yellow-100 text-yellow-700 border-yellow-300">Compare</Button>
          <Button variant="outline" size="sm" className="bg-white">Precedent</Button>
          <Button variant="outline" size="sm" className="bg-white text-black">Analyze</Button>
          <div className="text-sm text-gray-500">Showing {uniqueLabels.length} rows</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-bold">Transaction Name</TableHead>
                {projectNames.map((pname, idx) => (
                  <TableHead key={idx} className="font-bold">Project {pname}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {uniqueLabels.map((label, rowIndex) => {
                const mainRowCells = (
                  <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}>
                    <TableCell className="font-bold">{label}</TableCell>
                    {allDealsData.map((deal, dealIndex) => {
                      const item = deal.find(d => d.label === label)
                      const key = `${rowIndex}-${dealIndex}`
                      return (
                        <TableCell key={dealIndex}>
                          {item ? (
                            <div className="flex items-center space-x-2">
                              <span>{item.value}</span>
                              {item.meta && (
                                <button onClick={() => toggleCell(rowIndex, dealIndex)}>
                                  {expandedCells[key] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                              )}
                            </div>
                          ) : ""}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )

                const expandedRows = []
                for (let dealIndex = 0; dealIndex < allDealsData.length; dealIndex++) {
                  const deal = allDealsData[dealIndex]
                  const item = deal.find(d => d.label === label)
                  const key = `${rowIndex}-${dealIndex}`
                  if (item && item.meta && expandedCells[key]) {
                    expandedRows.push(
                      <TableRow key={`meta-${rowIndex}-${dealIndex}`} className="bg-white">
                        <TableCell colSpan={1 + projectNames.length} className="p-4 text-gray-600">
                          {item.meta}
                        </TableCell>
                      </TableRow>
                    )
                  }
                }

                return (
                  <React.Fragment key={rowIndex}>
                    {mainRowCells}
                    {expandedRows}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
