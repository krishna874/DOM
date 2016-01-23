(function () {
    var myNode = document.querySelector("#artlist .pixgrid ul");
    myNode.addEventListener("click", function(e) {
        if(e.target.tagName === 'IMG') {
            var location = document.createElement("div");
            location.id = "location";
            document.body.appendChild(location); // appending to body
            
           location.style.position = 'absolute';
            location.style.top = 0;
			location.style.backgroundColor = 'rgba(0,0,0,0.7)';
			location.style.cursor = 'pointer';
            
            //resize and position  location
            
            location.style.width = window.innerWidth + "px";
            location.style.height = window.innerHeight + "px";
            location.style.top = pageYOffset + "px";
            location.style.left = pageXOffset + "px";
            
            // displaying the large image
            
            var imageSrc = e.target.src;
            var largeImage = document.createElement("img");
            var largeImageSrc = imageSrc.substr(0, imageSrc.length-7) + ".jpg";
            largeImage.id = "largeImage";
            largeImage.src = largeImageSrc;
            largeImage.style.position = "absolute";
            largeImage.style.display ="block";
            location.appendChild(largeImage);
            
            // resizeing large image
            largeImage.addEventListener("load", function() {
                //Resize if taller
				if (this.height > window.innerHeight) {
					this.ratio = window.innerHeight / this.height;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}

				//Resize if wider
				if (this.width > window.innerWidth) {
					this.ratio = window.innerWidth / this.width;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}
                centeringImage(this);
                location.appendChild(largeImage);
            }, false);
            largeImage.addEventListener("click", function() {
                if (location) {
                    window.removeEventListener("resize", window, false);
                    window.removeEventListener("scroll", window, false);
                    location.parentNode.removeChild(location);
                    
                }
                
            },false);
            window.addEventListener("scroll", function() {
                if(location) {
                    location.style.top = window.pageYOffset + "px";
                    location.style.left = window.pageXOffset + "px";
                }
                
            }, false);
            window.addEventListener("resize", function() {
               if (location) {
                   location.style.width = window.innerWidth + "px";
                   location.style.height = window.innerHeight +  "px";;
                   location.style.top = pageYOffset + "px";
                   location.style.left = pageXOffset + "px";
                   centeringImage(largeImage);
                   
               } 
            },false);
           
        
        } // target is image
    }, false); 
    // target is clicked
    
    
})(); //self executing function

//centering image
      function centeringImage(image) {
          var diffX = (window.innerWidth - image.width) / 2;
          var diffY = (window.innerHeight - image.height) / 2;
          
          image.style.top = diffY + "px";
          image.style.left = diffX + "px";
           
          return image;
          
      }
        

