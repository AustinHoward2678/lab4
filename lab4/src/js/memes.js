import './general';
import defaultImageSource from './img_the_scream.jpg'; 

class Memes {
  constructor() {
    console.log("Inside the Memes JS File.");
    console.log("The general.js file should have been loaded.");
  
    // Initialize UI elements
    this.$bottomTextInput = document.getElementById('bottomText');
    this.$imageInput = document.getElementById('image');
    this.$downloadButton = document.getElementById('downloadMeme');
    this.$canvas = document.getElementById('imgCanvas');
    this.$defaultImage = document.querySelector('#defaultImage');
    this.image = new Image(); // Initialize image object
    this.image.src = defaultImageSource; // Set source to default image
    this.$context = this.$canvas.getContext('2d');
    this.deviceWidth = window.innerWidth;

    // Call methods
    this.createCanvas();
    this.createMeme();
    this.addEventListeners();
  }

  /*  
  Create a class called Memes
  - Part 1 - Setup the canvas and draw the default meme
    - Initialize instance variables for all of the ui elements in the constructor
        this.$bottomTextInput = 
        this.$imageInput = 
        this.$downloadButton = 
        this.$canvas = 
        this.$defaultImage = document.querySelector('#defaultImage');
        this.image = this.$defaultImage
        this.$context = this.$canvas.getContext('2d');
        this.deviceWidth = window.innerWidth;

    - Write the method createCanvas
      - set the width of the canvas to the minimum of 1000 and deviceWidth - 30
      - set the height of the canvas to the min of 1000 and the deviceWidth
      - add a call to this method in the constructor
      */
  createCanvas() {
    // Set canvas dimensions
    this.$canvas.width = Math.min(1000, this.deviceWidth - 30);
    this.$canvas.height = Math.min(1000, this.deviceWidth);
  }
  /*
    - Write the method createMeme.  It should
      - clear the previous image from the page
      - draw the image
        - initialize the height and width of the canvas to the height and width of the (default) image
        - draw the image on the context
      - setup text drawing
        - initialize a local constant for the font size.  Here's the calculation   
          this.$canvas.width+this.$canvas.height)/2)*4/100;
        - set the font of the context to `${fontSize}pt sans-serif`
          Notice the template literal instead of concatenation!
        - set the textAlign property to center
        - set the textBaseline property to top
        - set the lineWidth property to 1/5 of the fontSize
        - set the strokeStyle (outline) property to black
        - set the fillStyle to white
      - draw the text
        - get the default bottom text from the ui and put it in a variable
        - make sure it is all caps
        - write it on the context 
        - don't forget to outline the text in black!
      - add a call to this method in the constructor
    END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE THE MEME ON THE PAGE */
  createMeme() {
    // Resize canvas if necessary
    this.resizeCanvas(this.image.height, this.image.width);

    // Clear previous image
    this.$context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

    // Draw image
    this.$context.drawImage(this.image, 0, 0);

    // Setup text drawing
    const fontSize = ((this.$canvas.width + this.$canvas.height) / 2) * (4 / 100);
    this.$context.font = `${fontSize}px sans-serif`;
    this.$context.textAlign = 'center';
    this.$context.textBaseline = 'top';
    this.$context.lineWidth = fontSize / 5;
    this.$context.strokeStyle = 'black';
    this.$context.fillStyle = 'white';

    // Draw bottom text
    let bottomText = this.$bottomTextInput.value.toUpperCase();
    this.$context.strokeText(bottomText, this.$canvas.width / 2, this.$canvas.height - fontSize);
    this.$context.fillText(bottomText, this.$canvas.width / 2, this.$canvas.height - fontSize);
  }
  /*
  - PART 2 - Change the code as the user types
    - Write the method addEventListeners
      - bind this to the class for the method createMeme
      - add the keyup event and the change event to the bottom text input element
    - Add a call to this method in the constructor
    END OF PART 2 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE THE MEME CHANGE WHEN YOU TYPE
  */
  addEventListeners() {
    // Bind methods
    this.createMeme = this.createMeme.bind(this);

    // Add event listeners
    this.$bottomTextInput.addEventListener('keyup', this.createMeme);
    this.$bottomTextInput.addEventListener('change', this.createMeme);
  }
  /*
  - PART 3 - Download the meme
    - Write the method downloadMeme
      - declare a constant imageSource and set it to the canvas converted to data
      - set the href attribute of the download button to the imageSource
    - Change the addEventListers method to include downloading
      - bind the class to the downloadMeme method
      - add an event handler to the click event for the download button
  END OF PART 3 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO DOWNLOAD THE MEME
  */
  downloadMeme() {
    const imageSource = this.$canvas.toDataURL('image/png');
    this.$downloadButton.href = imageSource;
  }
  /*
  - PART 4 - Choose an image
    - Write the method loadImage
      - if there's something in the file input on the page
        - declare and instantiate a FileReader object
        - set it's onload hander to an anonymous function that
          - set the image instance variable to a new image
          - set it's onload handler to an anonymou function that
            - calls the createMeme method
            - calls the downloadMeme method (this was not included in the screencast)
          - set the src property of the image to the result from reading the file
        - read the file
    - Change the addEventListeners
      - bind the class to the loadImage method
      - add an event handler to the change event for the file input element on the page
  END OF PART 4 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO PICK AN IMAGE FOR THE MEME
  */
  loadImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = new Image();
        this.image.onload = () => {
          this.createMeme();
        };
        this.image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  /*
  - Part 5 - Resize the image if the user picks a really big image
    - Write the method resizeImage
      resizeCanvas(canvasHeight, canvasWidth) {
        let height = canvasHeight;
        let width = canvasWidth;
        let scale = 1;
        while(height > Math.min(1000, this.deviceWidth-30) && width > Math.min(1000, this.deviceWidth-30)) {
          height /= 2;
          width /= 2;
          scale /= 2
        }
        this.$canvas.height = height;
        this.$canvas.width = width;
        this.$context.scale(scale, scale);
      }
    - Change the method addEventListener
      - bind the class to the resizeImage method
      - call resizeCanvas in createMeme just before you draw the image
  END OF PART 5 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO PICK A REALLY LARGE IMAGE
  */
  resizeCanvas(canvasHeight, canvasWidth) {
    let height = canvasHeight;
    let width = canvasWidth;
    let scale = 1;
    while (height > Math.min(1000, this.deviceWidth - 30) && width > Math.min(1000, this.deviceWidth - 30)) {
      height /= 2;
      width /= 2;
      scale /= 2;
    }
    this.$canvas.height = height;
    this.$canvas.width = width;
    this.$context.scale(scale, scale);
  }

  /*
  - Part 6 - Provide the user with some additional functionality.  You could
    - allow the user to add text to the top of the meme
    - allow the user to pick the font for the text
    - allow the user to pick the font color for the text
    - allow the user to pick the font size for the text
    - FOR at least 2 of the additional features 
      - add html element to the html page to allow the user to work with your feature
      - change the JS class to add event handlers to your ui elements.  The event should trigger a call to createMeme
      - change the createMeme method to add your features to the canvas.
  */
}

window.onload = () => {
  new Memes();
};
