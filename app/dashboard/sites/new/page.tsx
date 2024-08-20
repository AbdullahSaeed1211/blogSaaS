import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>Create your site here ...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="grid gap-2">
              <Label>Site Name</Label>
              <Input placeholder="site name" />
            </div>
            <div className="grid gap-2">
                <Label>Subdirectory</Label>
                <Input placeholder="subdirectory"/>
            </div>
            <div className="grid gap=2">
                <Label>Description</Label>
                <Textarea placeholder="Small Description for your Site." />
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button>Create Site</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
