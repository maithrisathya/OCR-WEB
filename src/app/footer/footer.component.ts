
import { Component, OnInit,Renderer2} from '@angular/core';
import * as $ from 'jquery';

declare var Tiff: any;

import { HeaderService } from '../services/header.service';
import { ImageService } from '../services/images.service';
import { Images } from '../shared/images.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ViewerService } from '../services/viewer.service';
import { XmlModel } from '../shared/xml-model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  title = 'Layout';
  value = 'horizontal';
  imagewidth;

  selectedImage: string;
  anotherTryVisible: boolean;
  public localUrl: any;
  public tiffUrl: any;
  url;
  fileName : any;
  localUrlArray: any[]=[];
  files: any[] = []
   nextImages = true;
   previousImages=true;
  loaded = false;
  imgFileCount = 0;
  imgWidth;
  isTiff=false;
  fit:string;
  public percentage:number;
  public angle:number=0.0;
  btnImgArray: any[] = [];
  display="none";
  images :Images[];
 divelement=true;

  constructor(private headerService: HeaderService,private imageService:ImageService,private viewerService:ViewerService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.percentage= this.headerService.getpercentagevary();
    this.headerService.percentageChange
    .subscribe(
      (percent:number)=>{
        this.percentage=percent;
      }
    );

    this.imageService.nextImageChange.subscribe( (nextImages: boolean) => {
      console.log("nextImages inside footer: "+nextImages);
      this.nextImages = nextImages;
   });

   this.imageService.previousImageChange.subscribe( (previousImages: boolean) => {
    console.log("nextImages inside footer: "+previousImages);
    this.previousImages = previousImages;
 });




  }
      onEnter(value: number) {
    this.angle = value;
    this.viewerService.angle = this.angle;
    this.viewerService.onEnter();

      }


    onZoom(value:number){

      this.percentage=value;
      this.viewerService.percentage= this.percentage;
      this.viewerService.onZoom();


    }

    asVertical(){
      this.value='horizontal';

      this.viewerService.asVertical();
      console.log("asVertical has been invoked from screen");
      this.percentage =  this.viewerService.percentage;


    }

    asHorizontal(){
      this.value='vertical';
      this.viewerService.asHorizontal();

      this.percentage =  this.viewerService.percentage;
    }

    fitheight(){
      this.viewerService.fitheight();
      this.percentage=this.viewerService.percentage;
    }

    fitwidth(){
      // this.viewerService.fitwidth();
    this.viewerService.fitwidth()
    this.percentage=this.viewerService.percentage;

    }

    zoomInFun(){

     this.viewerService.zoomInFun();
     this.percentage=this.viewerService.percentage;
      }

    zoomOutFun(){

             this.viewerService.zoomOutFun();
             this.percentage=this.viewerService.percentage;
       }
  rotateImage()
  {
   this.viewerService.rotateImage();
  this.angle=this.viewerService.angle;
  }
  rotateImageanti()
  {
    this.viewerService.rotateImageanti();
     this.angle=this.viewerService.angle;
  }
 imgSize(){
  var myImg;
    myImg= document.getElementById("imgToRead");

    var realWidth = myImg.naturalWidth;
    var realHeight = myImg.naturalHeight;
    alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);
 }
 orginalsize(){

  this.viewerService.orginalsize();
  this.percentage=this.viewerService.percentage;

 }
 openModalDialog(){
  this.images = this.imageService.getImages();
  this.imageService.openModalDialog(this.images,this.display);
}

NextImage(){
    this.imageService.nextPage();
    // console.log("inside footer nextImage: "+this.imageService.nextImages);
    // this.nextImages = this.imageService.nextImages;
    // console.log("next Images"+this.nextImages);
  }

  previousImage(){
    this.imageService.previousPage();
    // console.log("inside footer previousImage: "+this.imageService.previousImages);
    // this.previousImages = this.imageService.previousImages;
    // console.log("previous Images"+this.previousImages);
 }

 lastImage(){
   this.imageService.LastImage();
 }
 firstImage(){
   this.imageService.firstImage();
 }
 skipPage(){
  //this.localUrl = this.localUrlArray[this.imgFileCount];
}

loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "assets/BaahyaakaashayaanigaluTelaaduvudeke_0007.xml", true);
  xmlhttp.send();
  
}

}

function convertCanvasToImage(canvas) {
  console.log("in convert................");
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  console.log("image.src: "+image.src);
  return image;
}

function myFunction(xml){
  var txt;
  var xmlDoc = xml.responseXML;
  var block = xmlDoc.getElementsByTagName("block");

  console.log("length ====="+block.length);
  for (let i = 0; i <block.length; i++) {
    if(block[i].children != null){
      for(let j= 0; j <  block[i].children.length;j++){
        if(block[i].children[j].children != null){
          for(let k=0;k < block[i].children[j].children.length;k++){
            // console.log("block childnodes----"+block[i].children[j].nodeName);
            // console.log("block childnodes----"+ block[i].children.length);
            // console.log("wordssss----"+block[i].children[j].children[k].getAttribute('unicode'));
            if(block[i].children[j].children[k].getAttribute('unicode') != null){
              txt = block[i].children[j].children[k].getAttribute('unicode');
              var wordValue = new XmlModel(txt,block[i].children[j].children[k].getAttribute('rowStart'),block[i].children[j].children[k].getAttribute('rowEnd'),block[i].children[j].children[k].getAttribute('colStart'),block[i].children[j].children[k].getAttribute('colEnd'));
              XmlModel.textArray.push(wordValue);
            }
           }
        }
   }
}
} 
// console.log("words array length"+this.words.length);
//  document.getElementById("demo").innerHTML = txt;
}

