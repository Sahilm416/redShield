import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotVerified() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1.5">
        <CardTitle className="text-2xl font-bold">Verification Needed</CardTitle>
        <CardDescription>You are not verified yet. Verify your email to proceed.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button className="w-full max-w-sm" variant="outline">
          Verify Email
        </Button>
      </CardContent>
    </Card>
  )
}

