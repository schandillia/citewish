import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button variant="default" className="bg-brand-700">
        Button
      </Button>
      <p className="text-center text-xl text-brand-600">
        This is a demo of the sans font
      </p>
      <p className="text-lg text-muted">testing a default color</p>
    </div>
  );
}
