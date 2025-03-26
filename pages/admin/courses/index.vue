<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  Button,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  CardHeader,
  CardTitle,
  CardDescription,
} from '#components'

definePageMeta({
  layout: 'admin',
})

// TODO: Replace with actual API call
const courses = [
  {
    id: 1,
    name: 'Beginner Salsa with Anna',
    description: 'Master the fundamentals of Salsa dancing with our comprehensive beginner course. Learn basic steps, rhythm, and partner work in a fun and supportive environment.',
    price: 49,
    instructorName: 'Anna Smith',
    level: 'Beginner',
    totalLessons: 12,
    status: 'published',
    createdAt: '2024-03-15',
    image: '/images/courses/salsa-beginner.jpg'
  },
  {
    id: 2,
    name: 'Intermediate Bachata',
    description: 'Take your Bachata skills to the next level with advanced patterns, body movement, and musicality training. Perfect for dancers who know the basics.',
    price: 59,
    instructorName: 'Carlos Rodriguez',
    level: 'Intermediate',
    totalLessons: 8,
    status: 'draft',
    createdAt: '2024-03-14',
    image: '/images/courses/bachata-intermediate.jpg'
  },
  {
    id: 3,
    name: 'Advanced Kizomba Techniques',
    description: 'Dive deep into advanced Kizomba techniques, styling, and musicality. This course is designed for experienced dancers looking to perfect their craft.',
    price: 79,
    instructorName: 'Maria Santos',
    level: 'Advanced',
    totalLessons: 10,
    status: 'published',
    createdAt: '2024-03-13',
    image: '/images/courses/kizomba-advanced.jpg'
  }
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Calculate statistics
const totalCourses = courses.length
const publishedCourses = courses.filter(course => course.status === 'published').length
const totalLessons = courses.reduce((sum, course) => sum + course.totalLessons, 0)
const averagePrice = courses.reduce((sum, course) => sum + course.price, 0) / courses.length
</script>

<template>
  <div class="container py-6 space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Courses</h1>
        <p class="text-muted-foreground mt-1">
          Manage and create your dance courses
        </p>
      </div>
      <Button asChild>
        <NuxtLink to="/admin/courses/create">
          <Icon name="lucide:plus" class="h-4 w-4 mr-2" />
          Create Course
        </NuxtLink>
      </Button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            Total Courses
          </CardTitle>
          <div class="flex items-center justify-between">
            <CardDescription class="text-2xl font-bold">
              {{ totalCourses }}
            </CardDescription>
            <Icon 
              name="lucide:book" 
              class="h-4 w-4 text-muted-foreground"
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            Published
          </CardTitle>
          <div class="flex items-center justify-between">
            <CardDescription class="text-2xl font-bold">
              {{ publishedCourses }}
            </CardDescription>
            <Icon 
              name="lucide:check-circle" 
              class="h-4 w-4 text-emerald-500"
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            Total Lessons
          </CardTitle>
          <div class="flex items-center justify-between">
            <CardDescription class="text-2xl font-bold">
              {{ totalLessons }}
            </CardDescription>
            <Icon 
              name="lucide:book-open" 
              class="h-4 w-4 text-muted-foreground"
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            Average Price
          </CardTitle>
          <div class="flex items-center justify-between">
            <CardDescription class="text-2xl font-bold">
              {{ formatPrice(averagePrice) }}
            </CardDescription>
            <Icon 
              name="lucide:dollar-sign" 
              class="h-4 w-4 text-muted-foreground"
            />
          </div>
        </CardHeader>
      </Card>
    </div>

    <Card v-if="courses.length">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead class="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="course in courses" :key="course.id">
            <TableCell class="font-medium">
              <div class="max-w-[300px]">
                <div class="truncate">{{ course.name }}</div>
                <div class="text-xs text-muted-foreground">
                  {{ course.totalLessons }} lessons
                </div>
              </div>
            </TableCell>
            <TableCell>{{ course.instructorName }}</TableCell>
            <TableCell>
              <Badge :variant="course.level === 'Advanced' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'outline'">
                {{ course.level }}
              </Badge>
            </TableCell>
            <TableCell>{{ formatPrice(course.price) }}</TableCell>
            <TableCell>
              <Badge variant="secondary" :class="{ 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-100': course.status === 'published' }">
                {{ course.status }}
              </Badge>
            </TableCell>
            <TableCell>{{ formatDate(course.createdAt) }}</TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" class="h-8 w-8 p-0">
                    <Icon name="lucide:more-horizontal" class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <NuxtLink :to="`/admin/courses/create?id=${course.id}`">
                      <Icon name="lucide:pencil" class="h-4 w-4 mr-2" />
                      Edit
                    </NuxtLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="lucide:eye" class="h-4 w-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem class="text-destructive">
                    <Icon name="lucide:trash" class="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>

    <div v-else class="text-center py-12">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Icon name="lucide:book-open" class="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 class="text-lg font-semibold">No courses yet</h2>
      <p class="text-muted-foreground mt-1">
        Get started by creating your first course
      </p>
      <Button asChild class="mt-4">
        <NuxtLink to="/admin/courses/create">
          Create Course
        </NuxtLink>
      </Button>
    </div>
  </div>
</template> 