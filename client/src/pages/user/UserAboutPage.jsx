import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteUserIndexBlogs } from "@/helpers/route";

export default function UserAboutPage() {
  return (
    <div className="min-h-screen px-6 py-6 mx-auto space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">About Our Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-500 max-w-2xl mx-auto">
          Welcome to our blog platform – a place where ideas come to life.
          Whether you're a reader or a writer, our blog offers a clean and
          intuitive space to share knowledge, stories, and inspiration.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-500">
              To empower creators and readers by building a community centered
              around quality content, creativity, and authenticity.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">Why We Exist</h3>
            <p className="text-gray-600 dark:text-gray-500">
              We believe that every voice matters. Our blog app gives everyone
              the power to share their thoughts in a beautifully designed
              environment.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">Built with Love</h3>
            <p className="text-gray-600 dark:text-gray-500">
              Crafted using modern technologies like React, Tailwind CSS, and
              ShadCN UI – ensuring speed, accessibility, and a delightful
              experience.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Meet the Creator</h2>
        <p className="text-gray-600 dark:text-gray-500 max-w-xl mx-auto">
          Hi! I'm Deepak Kumar Yadav, a passionate web developer who loves clean
          UI and meaningful content. I built this blog to give people like you a
          space to express freely.
        </p>
      </section>

      <section className="text-center">
        <Link to={RouteUserIndexBlogs}>
          <Button className="text-lg px-6 py-4 mt-6">Explore Blog</Button>
        </Link>
      </section>
    </div>
  );
}
