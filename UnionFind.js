'use strict'

class UnionFind{
  constructor(nodeList){
    this.nodeList = nodeList;
    this.data = [];
    for(var i = 0; i<nodeList.length; i++){
      this.data[i] = i;
    }
    console.log(this);
  }
  union(arg1, arg2){
    var foo = this.nodeList.indexOf(arg1);
    var bar = this.nodeList.indexOf(arg2);
    this.data[foo] = bar;
  }
  find(room1, room2){
    var foo = this.nodeList.indexOf(room1);
    var bar = this.nodeList.indexOf(room2);
    console.log(foo, room1, bar, room2);
    while(foo != this.data[foo]){
       foo = this.data[foo];
       console.log('bl', foo, room1);
    }
    while(bar != this.data[bar]){
       bar = this.data[bar];
       console.log('aj', bar, room2)
    }
    if(foo === bar){
      return true;
    }else{
      return false;
    }
  }
}
