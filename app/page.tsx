"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Book, GraduationCap, Home, Star, User, AlertTriangle, Moon, Sun, Info } from "lucide-react"
import Link from "next/link"

const courses = [
  { id: 1, title: "Introdução à Programação", description: "Aprenda os fundamentos da programação", duration: "4 semanas", rating: 0 },
  { id: 2, title: "Web Development", description: "Crie sites modernos com HTML, CSS e JavaScript", duration: "8 semanas", rating: 0 },
  { id: 3, title: "React Avançado", description: "Domine o React e suas bibliotecas mais populares", duration: "6 semanas", rating: 0 },
]

export default function Component() {
  const [courseRatings, setCourseRatings] = useState(courses.map(course => ({ id: course.id, rating: course.rating })))
  const [notes, setNotes] = useState("")
  const [todos, setTodos] = useState([
    { id: 1, text: "Assistir à aula 1", completed: false },
    { id: 2, text: "Fazer exercício 1", completed: false },
    { id: 3, text: "Ler material complementar", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")
  const [timeLeft, setTimeLeft] = useState(5 * 60) // 5 minutos em segundos
  const [promoExpired, setPromoExpired] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    } else {
      setPromoExpired(true)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleRating = (courseId: number, rating: number) => {
    setCourseRatings(prevRatings =>
      prevRatings.map(course =>
        course.id === courseId ? { ...course, rating } : course
      )
    )
  }

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    <Home className="mr-2 h-4 w-4" />
                    Início
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Cursos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {courses.map((course) => (
                      <li key={course.id}>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href={`/cursos/${course.id}`}
                          >
                            <div className="text-sm font-medium leading-none">{course.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {course.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  <Info className="mr-2 h-4 w-4" />
                  Sobre
                </NavigationMenuLink>
              </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Bem-vindo ao nosso Site de Cursos</h1>
        
        {!promoExpired && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Promoção Especial!</AlertTitle>
            <AlertDescription>
              Aproveite 20% de desconto em todos os cursos! Oferta expira em {formatTime(timeLeft)}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nossos Cursos</h2>
            <div className="grid grid-cols-1 gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Duração: {course.duration}</p>
                    <div className="mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          className="p-0"
                          onClick={() => handleRating(course.id, star)}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= (courseRatings.find(r => r.id === course.id)?.rating || 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Book className="mr-2 h-4 w-4" />
                      Inscrever-se
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Caderno de Anotações</h2>
            <Card>
              <CardHeader>
                <CardTitle>Suas Anotações</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Digite suas anotações aqui..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Lista de Tarefas</h2>
            <Card>
              <CardHeader>
                <CardTitle>Suas Tarefas</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Nova tarefa..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                  <Button type="submit">Adicionar</Button>
                </form>
                <ul>
                  {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center gap-2 mb-2">
                      <Checkbox
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onCheckedChange={() => handleToggleTodo(todo.id)}
                      />
                      <Label
                        htmlFor={`todo-${todo.id}`}
                        className={`flex-grow ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {todo.text}
                      </Label>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2023 Site de Cursos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}