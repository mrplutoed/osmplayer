/**
 *  Copyright (c) 2010 Alethia Inc,
 *  http://www.alethia-inc.com
 *  Developed by Travis Tidwell | travist at alethia-inc.com 
 *
 *  License:  GPL version 3.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
(function(a){jQuery.media=jQuery.media?jQuery.media:{};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{logo:"logo.png",logoWidth:49,logoHeight:15,logopos:"sw",logox:5,logoy:5,link:"http://www.mediafront.org",file:"",image:"",timeout:4,autoLoad:true});jQuery.media.ids=jQuery.extend(jQuery.media.ids,{busy:"#mediabusy",preview:"#mediapreview",play:"#mediaplay",media:"#mediadisplay"});jQuery.fn.minplayer=function(b){if(this.length===0){return null;}return new (function(c,d){d=jQuery.media.utils.getSettings(d);this.display=c;var e=this;this.autoLoad=d.autoLoad;this.busy=c.find(d.ids.busy);this.busyImg=this.busy.find("img");this.busyWidth=this.busyImg.width();this.busyHeight=this.busyImg.height();this.play=c.find(d.ids.play);this.play.bind("click",function(){e.togglePlayPause();});this.playImg=this.play.find("img");this.playWidth=this.playImg.width();this.playHeight=this.playImg.height();this.preview=c.find(d.ids.preview).mediaimage();if(this.preview){this.preview.display.bind("imageLoaded",function(){e.onPreviewLoaded();});}this.usePlayerControls=false;this.busyFlags=0;this.busyVisible=false;this.playVisible=false;this.previewVisible=false;this.playing=false;this.hasMedia=false;this.timeoutId=0;this.width=this.display.width();this.height=this.display.height();this.showElement=function(h,f,g){if(h&&!this.usePlayerControls){if(f){h.show(g);}else{h.hide(g);}}};this.showPlay=function(f,g){f&=this.hasMedia;this.playVisible=f;this.showElement(this.play,f,g);};this.showBusy=function(h,f,g){f&=this.hasMedia;if(f){this.busyFlags|=(1<<h);}else{this.busyFlags&=~(1<<h);}this.busyVisible=(this.busyFlags>0);this.showElement(this.busy,this.busyVisible,g);};this.showPreview=function(f,g){this.previewVisible=f;if(this.preview){this.showElement(this.preview.display,f,g);}};this.onControlUpdate=function(f){if(this.media){if(this.media.playerReady){switch(f.type){case"play":this.media.player.playMedia();break;case"pause":this.media.player.pauseMedia();break;case"seek":this.media.player.seekMedia(f.value);break;case"volume":this.media.player.setVolume(f.value);break;case"mute":this.media.mute(f.value);break;}}else{if((this.media.playQueue.length>0)&&!this.media.mediaFile){this.autoLoad=true;this.playNext();}}if(d.template&&d.template.onControlUpdate){d.template.onControlUpdate(f);}}};this.fullScreen=function(f){if(d.template.onFullScreen){d.template.onFullScreen(f);}};this.onPreviewLoaded=function(){this.previewVisible=true;};this.onMediaUpdate=function(f){switch(f.type){case"paused":this.playing=false;this.showPlay(true);this.showBusy(1,false);if(!this.media.loaded){this.showPreview(true);}break;case"update":case"playing":this.playing=true;this.showPlay(false);this.showBusy(1,false);this.showPreview((this.media.mediaFile.type=="audio"));break;case"initialize":this.playing=false;this.showPlay(true);this.showBusy(1,this.autoLoad);this.showPreview(true);break;case"buffering":this.showPlay(true);this.showBusy(1,true);this.showPreview((this.media.mediaFile.type=="audio"));break;}};this.media=this.display.find(d.ids.media).mediadisplay(d);if(this.media){this.media.display.click(function(){if(e.media.player&&!e.media.hasControls()){e.media.player.pauseMedia();}});}if(!d.controllerOnly){this.display.prepend('<div class="'+d.prefix+'medialogo"></div>');this.logo=this.display.find("."+d.prefix+"medialogo").mediaimage(d.link);if(this.logo){this.logo.display.css({zIndex:(d.zIndex+90),width:d.logoWidth,height:d.logoHeight});this.logo.loadImage(d.logo);}}this.reset=function(){this.hasMedia=false;this.playing=false;this.showBusy(1,false);this.showPlay(true);this.showPreview(true);clearTimeout(this.timeoutId);if(this.media){this.media.reset();}};this.togglePlayPause=function(){if(this.media){if(this.media.playerReady){if(this.playing){this.showPlay(true);this.media.player.pauseMedia();}else{this.showPlay(false);this.media.player.playMedia();}}else{if((this.media.playQueue.length>0)&&!this.media.mediaFile){this.autoLoad=true;this.playNext();}}}};this.loadImage=function(f){if(this.preview){this.preview.loadImage(f);if(this.media){this.media.preview=f;}}};this.onResize=function(){if(this.preview){this.preview.refresh();}};this.clearImage=function(){if(this.preview){this.preview.clear();}};this.loadFiles=function(f){this.reset();this.hasMedia=this.media&&this.media.loadFiles(f);if(this.hasMedia&&this.autoLoad){this.media.playNext();}else{if(!this.hasMedia){this.showBusy(1,false);this.showPlay(false);this.timeoutId=setTimeout(function(){e.media.display.trigger("mediaupdate",{type:"complete"});},(d.timeout*1000));}}return this.hasMedia;};this.playNext=function(){if(this.media){this.media.playNext();}};this.hasControls=function(){if(this.media){return this.media.hasControls();}return true;};this.showControls=function(f){if(this.media){this.media.showControls(f);}};this.loadMedia=function(f){this.reset();if(this.media){this.media.loadMedia(f);}};if(d.file){this.loadMedia(d.file);}if(d.image){this.loadImage(d.image);}})(this,b);};})(jQuery);