/**
 * @desc CSS 3D 全景关键代码
 */

import React, { useState, useEffect } from 'react'

import { DEFAULT_PERSPECTIVE, RATIO } from './constants'
import { getLineWidth, getDistance } from './utils'

function Pano(props) {
  const {
    planeNum = 0,
    radius = 100,
    perspective = DEFAULT_PERSPECTIVE,
    rotateX = 0,
    rotateY = 0,
    isBackfaceHidden = false,
  } = props

  const [planes, setPlanes] = useState([])

  useEffect(() => {
    // 切片夹角角度
    const degree = 360 / planeNum
    // 切片夹角弧度
    const angle = Math.PI / planeNum
    // 切片宽度
    const width = getLineWidth(radius, angle)
    // 总切片宽
    const totalWidth = width * planeNum
    // 切片高度
    const height = totalWidth / RATIO
    // 切片与圆心的距离
    const distance = getDistance(radius, angle)
    const renderPlane = i => {
      const rotate = degree * i
      const position = parseInt(-width * (planeNum - i - 1), 10)
  
      return (
        <div
          className="plane"
          key={`plane-${i}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            margin: `${-height / 2}px 0 0 ${-width / 2}px`,
            transform: `rotateY(${rotate}deg) translateZ(${-distance}px)`,
            backgroundSize: `${totalWidth}px auto`,
            backgroundPosition: `${position}px center`,
            backfaceVisibility: isBackfaceHidden ? 'hidden' : 'visible'
          }}
        />
      )
    }
    const list = []

    for (let i = 0; i < planeNum; i++) {
      list.push(renderPlane(i))
    }

    setPlanes(list)
  }, [planeNum, radius, isBackfaceHidden])

  return (
    <div
      className="container"
      style={{
        perspective: `${perspective}px`
      }}
    >
      <div className="wrapper">
        <div
          className="wrapper2"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          }}
        >
          {planes}
        </div>
      </div>
    </div>
  )
}

export default Pano;
