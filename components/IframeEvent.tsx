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
      exUrl: "#project-content a, #project-meta a, #top-news-carousel a , #project-rightside a, .exurl, .exurl-list a ,.btn-submit-project, .btn-submit-project a, #people-on-near a, #people-linktree a, .awesome-project-card", //external urls
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
    // Use event delegation for better handling of dynamic content
    document.addEventListener('click', function(e) {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;

      // Check which type of link was clicked
      for (const [key, selector] of Object.entries(projectEventTypes)) {
        if (link.matches(selector)) {
          e.preventDefault();
          console.log(`iframe: clicked on type ${key} | link:`, link.href);
          window.parent.postMessage({
            type: key,
            value: link.href
          }, "*");
          break;
        }
      }
    });
    // });


  }, [])

  return <></>

}  