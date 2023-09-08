import React, { ReactElement, Children, useRef, useEffect, FC, useLayoutEffect, useState } from 'react';
import './ResizeWindow.css'

const Slot = () => null;

function ResizeWindow(props) {
    const childrenArray = Children.toArray(props.children) ;
    const leftActionsSlot = childrenArray.find(child => child.props.name === 'leftActions');
    const rightActionsSlot = childrenArray.find(child => child.props.name === 'rightActions');
    const middleActionsSlot = childrenArray.find(child => child.props.name === 'middleActions');
    const parentRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const middleRef = useRef(null);
    let drag = false;
    let parentBox = {} 
    let minWidth = props.minWidth
    let middleWidth
    let initialLeftWidth;

    console.log("PROPS",props)

    useEffect(() => {
        /*
        1. We’re getting the parent element’s bounding box.
        2. We’re checking if the parent element’s width is less than the sum of the left and right widths.
        3. If it is, we’re setting the minWidth to half the parent element’s width.
        4. We’re setting the left and right widths to be equal to the parent element’s width divided by 2.
        */
        if (parentRef.current) {
            parentBox = parentRef.current.getBoundingClientRect()
            if (minWidth * 2 > parentBox.width) {
                minWidth = parentBox.width / 2
            }
        }
        if (leftRef.current) {
            leftRef.current.style.width = (((parentBox.width * props.leftWidth) / 100) - 5) + 'px'
            initialLeftWidth=((parentBox.width * props.leftWidth) / 100) 
        }
        if (rightRef.current) {
            rightRef.current.style.width = (((parentBox.width * props.rightWidth) / 100) - 5) + 'px'
        }
        if (middleRef.current) {
            middleRef.current.style.width = (((parentBox.width * props.middleWidth) / 100) - 5) + 'px'
            middleWidth=(((parentBox.width * props.middleWidth) / 100) - 5)
        }
    }, []);

    /*
    * It creates a drag event that will resize the left and right boxes.
    */
    const dragEvent = (event, slider) => {

        const sliderContainer = document.querySelector(".slider");
        sliderContainer.classList.add("sliding")


        event.preventDefault()
        if (parentRef.current) {
            parentBox = parentRef.current.getBoundingClientRect()
        }

        const x = event.x - parentBox.x; // Mouse position relative to the parent element

        // Ensure that the leftWidth doesn't go below the minWidth
        let leftWidth = x - 2 < minWidth ? minWidth : x - 2;
        // Ensure that the rightWidth doesn't go below the minWidth
        let rightWidth = parentBox.width - leftWidth-middleWidth - 2 < minWidth ? minWidth : parentBox.width - leftWidth - middleWidth - 2;
        // Update the styles
        // if(rightWidth<minWidth){
        //     rightWidth = minWidth
        //     leftWidth = parentBox.width - rightWidth - 10 
        // }
        if (leftRef.current) {
            leftRef.current.style.width = leftWidth + 'px';
        }
        // if (middleRef.current) {
        //     middleRef.current.style.width = middleWidth + 'px';
        // }
        if (rightRef.current) {
            rightRef.current.style.width = rightWidth + 'px';
        }
    
    }

    const dragEvent1 = (event) => {
       
        event.preventDefault()
        // console.log("parentRef.current",parentRef.current)
        const sliderContainer = document.querySelector(".slidermid");
        sliderContainer.classList.add("sliding")
        if (parentRef.current) {
            parentBox = parentRef.current.getBoundingClientRect()
        }
        let middleWidth = (event.x - parentBox.x-initialLeftWidth) - 5 < minWidth ? minWidth : (event.x - parentBox.x-initialLeftWidth) - 5
        let rightWidth = (parentBox.width - middleWidth-initialLeftWidth )- 5
        if (rightWidth < minWidth) {
            rightWidth = minWidth
            middleWidth = parentBox.width - rightWidth - initialLeftWidth - 15
        }
        const newLeftWidth = parentBox.width -rightWidth-middleWidth -10
        if (middleRef.current) {
            middleRef.current.style.width = middleWidth+ 'px'
            console.log("middleRef.current.style.width",middleRef.current.style.width)
        }
        if (rightRef.current) {
            rightRef.current.style.width = rightWidth + 'px'
        }
    }

    /*
    1. This function will be called when the mouseup event is triggered.
    2. Remove window event listener
    */
    const stopDragEvent = () => {
        drag = false
        const sliderContainer = document.querySelector(".slider");
        sliderContainer.classList.remove("sliding")
        window.removeEventListener('mousemove', dragEvent)
        window.removeEventListener('mouseup', stopDragEvent)
        window.removeEventListener('mousemove', dragEvent1)
    }

    const startDragEvent = (e, p) => {
        drag = true
        window.addEventListener('mousemove', dragEvent, false)
        window.addEventListener('mouseup', stopDragEvent, false)
    }
    const startDragEvent1 = (e, p) => {
        drag = true
        window.addEventListener('mousemove', dragEvent1, false)
        window.addEventListener('mouseup', stopDragEvent, false)
    }

    return (
        <div className="resizeWindow" ref={parentRef}>
            <div className="resizeWindow__left" ref={leftRef}>
                {leftActionsSlot?.props?.children}
            </div>
            <div
                className="slider"
                onMouseDown={startDragEvent}
            />
                     <div className="resizeWindow__left" ref={middleRef}>
                {middleActionsSlot?.props?.children}
            </div>
            <div
                className="slidermid"
                 onMouseDown={startDragEvent1}
            />
            <div className="resizeWindow__right" ref={rightRef}>
                {rightActionsSlot?.props?.children}
            </div>
        </div>
    )
}

ResizeWindow.Slot = Slot

export default ResizeWindow