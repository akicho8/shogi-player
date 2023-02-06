#!/usr/bin/env ruby
require "pathname"
require "nokogiri"

str = Pathname("templete.svg").read
doc = Nokogiri::XML(str)
puts doc

e = doc.at("path")

e["stroke-width"]   = "10"
e["stroke-opacity"] = "0.2"

e["fill"] = "hsla(0, 0%, 0%, 1.0)"
e["stroke"] = "rgb(255, 255, 255)"
Pathname("location_black.svg").write(doc)

e["fill"] = "hsla(0, 0%, 100%, 1.0)"
e["stroke"] = "rgb(0, 0, 0)"
Pathname("location_white.svg").write(doc)
# >> <?xml version="1.0" encoding="UTF-8" standalone="no"?>
# >> <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" style="overflow:visible" viewBox="-150 -162 300 324" height="324px" width="300px">
# >>   <rect fill-opacity="0" fill="rgb(0,0,0)" height="324" width="300" y="-162" x="-150"/>
# >>   <svg version="1.1" y="-250" x="-250" viewBox="-250 -250 500 500" height="500px" width="500px" style="overflow:visible">
# >>     <g transform="rotate(0,0,0)" stroke-linejoin="round" fill="#fff">
# >>       <path stroke-linecap="butt" stroke-linejoin="round" stroke-width="20" stroke-opacity="1" stroke="rgb(68,68,68)" fill="rgb(255,255,255)" d="m0.002-147l-98.2634 51.815l-24.5653 242.185h245.653l-24.5653-242.185z"/>
# >>     </g>
# >>   </svg>
# >> </svg>
