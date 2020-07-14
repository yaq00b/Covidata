import React, { useRef, useEffect, useState } from "react";
import "./styles.css";

import {
  select,
  line,
  max,
  brushX,
  curveCardinal,
  axisBottom,
  axisLeft,
  scaleLinear,
  event
} from "d3";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

function App() {
  const [data, setData] = useState([
    27,
    11946,
    87042,
    873079,
    3220000,
    6140000,
    10470000
  ]);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selection, setSelection] = useState([1, 1.5]);
  const previousSelection = usePrevious(selection);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height, 15]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .attr("stroke", "white");

    const yAxis = axisLeft(yScale);
    svg
      .select(".y-axis")
      .call(yAxis)
      .attr("stroke", "black");
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "cyan");

    svg
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("r", (value, index) =>
        index >= selection[0] && index <= selection[1] ? 5 : 4
      )
      .attr("fill", (value, index) =>
        index >= selection[0] && index <= selection[1] ? "red" : "yellow"
      )
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", yScale)
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".texts")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "texts")
          .text(value + " cases")
          .attr("stroke", "white")
          .attr("x", xScale(index))
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".texts").remove());

    const brush = brushX()
      .extent([[0, 0], [width, height]])
      .on("start brush end", () => {
        if (event.selection) {
          const indexSelection = event.selection.map(xScale.invert);
          setSelection(indexSelection);
        }
      });

    // initial position + retaining position on resize
    if (previousSelection === selection) {
      svg
        .select(".brush")
        .call(brush)
        .call(brush.move, selection.map(xScale));
    }
  }, [data, dimensions, selection, previousSelection]);

  return (
    <React.Fragment>
      <div className="svgDiv" ref={wrapperRef}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="brush" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default App;
