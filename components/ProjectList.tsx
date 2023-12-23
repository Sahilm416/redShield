
import { Card ,CardHeader, CardTitle ,CardContent ,CardDescription, CardFooter } from "./ui/card"

export default function ProjectList() {
  return (
    <main className="w-full max-w-[750px] grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 sm:px-2 px-5">
       <Card className="bg-slate-300 m-3 dark:bg-slate-900 dark:text-slate-300 text-slate-800">
        <CardHeader>
            <CardTitle>Project 1</CardTitle>
            <CardDescription >info about projet</CardDescription>
        </CardHeader>
       </Card>
       <Card className="bg-slate-300 m-3 dark:bg-slate-900 dark:text-slate-300 text-slate-800">
        <CardHeader>
            <CardTitle>Project 1</CardTitle>
            <CardDescription >info about projet</CardDescription>
        </CardHeader>
       </Card>
       <Card className="bg-slate-300  m-3 dark:bg-slate-900 dark:text-slate-300 text-slate-800">
        <CardHeader>
            <CardTitle>Project 1</CardTitle>
            <CardDescription >info about projet</CardDescription>
        </CardHeader>
       </Card>
       <Card className="bg-slate-300 m-3 dark:bg-slate-900 dark:text-slate-300 text-slate-800">
        <CardHeader>
            <CardTitle>Project 1</CardTitle>
            <CardDescription >info about projet</CardDescription>
        </CardHeader>
       </Card>
       <Card className="bg-slate-300 m-3 dark:bg-slate-900 dark:text-slate-300 text-slate-800">
        <CardHeader>
            <CardTitle>Project 1</CardTitle>
            <CardDescription >info about projet</CardDescription>
        </CardHeader>
       </Card>
       <Card className="bg-slate-300 m-3 dark:bg-slate-900 dark:text-slate-300 text-slate-800">
        <CardHeader>
            <CardTitle>Project 1</CardTitle>
            <CardDescription >info about projet</CardDescription>
        </CardHeader>
       </Card>
    </main>
  )
}

