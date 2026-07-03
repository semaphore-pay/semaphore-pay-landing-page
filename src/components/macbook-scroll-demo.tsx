import React from "react"
import { MacbookScroll } from "@/components/ui/macbook-scroll"

export default function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
      <MacbookScroll
        title={
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        }
        // badge={
        //   <a href="https://peerlist.io/manuarora">
        //     <Badge className="h-10 w-10 -rotate-12 transform" />
        //   </a>
        // }
        src={`/linear.webp`}
        showGradient={false}
      />
    </div>
  )
}
