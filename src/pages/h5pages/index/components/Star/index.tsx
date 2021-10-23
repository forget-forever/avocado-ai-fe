import React, { useEffect } from "react"
import { animate, init } from "./script"

const Star: React.FC = () => {

  useEffect(() => {
    let destory: (() => void) | null
    setTimeout(() => {
      const canvas = document.getElementById("myCanvas");
      destory = init(canvas);
      animate();
    }, 0)
    return () => {
      destory && destory();
    }
  }, [])
  const offset = 300

  return <>
    {/* eslint-disable-next-line react/forbid-elements */}
    <div
      id='myCanvas'
      style={{
        height: `calc(100vh + ${offset}px)`,
        width: `calc(100vw + ${offset / 2}px)`,
        position: 'relative',
        bottom: `${offset}px`,
        right: `${offset / 4}px`
      }}
    >
      <canvas style={{display: 'none'}}></canvas>
    </div>
  </>
}
export default Star