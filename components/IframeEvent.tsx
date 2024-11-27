"use client"
import { useEffect } from "react";

export default function IframeEvent() {

  useEffect(() => {

    if (typeof window === "undefined") {
      console.log("window is undefined");
      return;
    }

    const projectEventTypes = {
      id: ".project-card",
      cat: ".project-tag",
      exUrl: "#project-content a, #project-meta a, #project-rightside a, .exurl, .exurl-list a ,.btn-submit-project, .btn-submit-project a", //external urls
      page: "#navbar a, #policies a, .url"
    }

    console.log("sending message to parent window: ", event);

    window.iframeSendMsg = (type, url) => {
      window.parent.postMessage({
        type: type, // id  | cat | url | exUrl 
        value: url
      }, "*");
    }


    // document.addEventListener("DOMContentLoaded", function() {
    Object.keys(projectEventTypes).forEach(function (key) {
      let links = document.querySelectorAll(projectEventTypes[key]);
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (e) {
          e.preventDefault();
          //post url to the parent window (#BOS in this case)
          console.log(`iframe: clicked on type ${key} with value ${projectEventTypes[key]} | link:`, this.href);
          window.parent.postMessage({
            type: key, // id  | cat | url 
            value: this.href
          }, "*");
        });
      }
    });
    // });


  }, [])

  return <></>

}  