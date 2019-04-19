class Hb {
  constructor(options){
     this.options=options
  }
   private options:any
  /**
   * start
   */
  
  public start() {
    console.log('tag', requestAnimationFrame)
     this.clear()
  }

  /**
   * clear
   */
  public clear() {
     console.log(111)
     requestAnimationFrame(()=>{
      this.clear()
    })
  }
}

class  drops {
  constructor(x,y) {
     
  }
}