/**
 * @desc 控制界面
 */

import React, { useState } from 'react'
import Pano from './Pano'

import {
  DEFAULT_PERSPECTIVE,
  DEFAULT_PLANE_NUM,
  DEFAULT_ROTATE_X
} from './constants'

function Box() {
  const [planeNum, setPlaneNum] = useState(DEFAULT_PLANE_NUM)
  const [perspective, setPerspective] = useState(DEFAULT_PERSPECTIVE)
  const [rotateX, setRotateX] = useState(DEFAULT_ROTATE_X)
  const [rotateY, setRotateY] = useState(0)
  const [isBackfaceHidden, setIsBackfaceHidden] = useState(false)

  const onRangeChange = e => {
    if (!e.currentTarget) return
    const { value, name } = e.currentTarget
    switch (name) {
      case 'plane':
        setPlaneNum(value)
        break
      case 'perspective':
        setPerspective(value)
        break
      case 'rotateX':
        setRotateX(value)
        break
      case 'rotateY':
        setRotateY(value)
        break
      default:
        break
    }
  }

  const onCheckboxChange = e => {
    if (!e.currentTarget) return
    const isChecked = e.currentTarget.checked

    setIsBackfaceHidden(!!isChecked)
  }

  return (
    <div>
      <div className="controller">
        <label className="label">
          <span className="label_text">切片数量：</span>
          <span className="label_num">4</span>
          <input
            type="range"
            name="plane"
            min={4}
            max={20}
            value={planeNum}
            onChange={onRangeChange}
          />
          <span className="label_num">20</span>
        </label>
        <label className="label">
          <span className="label_text">perspective：</span>
          <span className="label_num">0</span>
          <input
            type="range"
            name="perspective"
            min={0}
            max={1000}
            value={perspective}
            onChange={onRangeChange}
          />
          <span className="label_num">1000</span>
        </label>
        <label className="label">
          <span className="label_text">X 轴旋转角度：</span>
          <span className="label_num">-90</span>
          <input
            type="range"
            name="rotateX"
            min={-90}
            max={90}
            value={rotateX}
            onChange={onRangeChange}
          />
          <span className="label_num">90</span>
        </label>
        <label className="label">
          <span className="label_text">Y 轴旋转角度：</span>
          <span className="label_num">-180</span>
          <input
            type="range"
            name="rotateY"
            min={-180}
            max={180}
            value={rotateY}
            onChange={onRangeChange}
          />
          <span className="label_num">180</span>
        </label>
        <label className="label">
          <span className="label_text">隐藏背面：</span>
          <input type="checkbox" onClick={onCheckboxChange} />
        </label>
      </div>
      <Pano
        planeNum={planeNum}
        perspective={perspective}
        rotateX={rotateX}
        rotateY={rotateY}
        isBackfaceHidden={isBackfaceHidden}
      />
    </div>
  )
}

export default Box
