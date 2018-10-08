import request from '@/utils/request'

export function getCityList(data){//获取城市列表
  return request({
    url: '/home/area/list',
    method: 'post',
    data
  })
}

export function getAllCityList(data){//获取所有城市列表
  return request({
    url:'/home/area/news/list',
    method:'post',
    data
  })
}

export function getBuildByCityId(data){//根据城市Id查询楼盘列表
  return request({
    url:'/building_info/list',
    method:'post',
    data
  })
}

export function pushTag(info, x, y){//放进一个标签
  console.log(info)
  // console.log(x, y)
  let container = document.getElementById('container')
  let tag = document.createElement('div');
  tag.setAttribute('class','tag');
  tag.setAttribute('id', info.id);
  let d = '<p>'+info.labelName+'</p><span>▼</span>';
  tag.innerHTML = d;
  container.appendChild(tag);
  if( x && y ){
    tag.style = 'left: ' + x + 'px; top: ' + y + 'px'
  }

  let mouseDownEvent = null;//鼠标按下时的鼠标事件信息
  let mouseDownX = null;//鼠标按下时在tag标签上横坐标
  let mouseDownY = null;//鼠标按下时在tag标签上纵坐标


  let _move = function(event){//鼠标移动事件
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    mouseDownX = mouseDownEvent.offsetX;
    mouseDownY = mouseDownEvent.offsetY;
    //限制拖动范围
    if(Number(event.pageX-event.target.x-mouseDownX)>=0 && Number(event.pageX-event.target.x-mouseDownX)<=Number(container.offsetWidth-tag.offsetWidth) && Number(event.pageY-event.target.y-mouseDownY - scrollTop) > 0 && Number(event.pageY-event.target.y-mouseDownY - scrollTop) <= Number(container.offsetHeight-tag.offsetHeight)){
      tag.style = 'left:'+Number(event.pageX-event.target.x-mouseDownX)+'px;top:'+Number(event.pageY-event.target.y-mouseDownY - scrollTop)+'px';
    }
  }
  tag.addEventListener('mousedown',function(e){//添加事件鼠标按下事件监听
    mouseDownEvent = e;
    container.addEventListener('mousemove',_move)
  })
  tag.onmouseup = function(){//鼠标在tag标签上抬起移除鼠标移动监听事件
    container.removeEventListener('mousemove',_move)
    let locatedInfo = {
      addressX:tag.offsetLeft+tag.offsetWidth/2,
      addressY:tag.offsetTop+tag.offsetHeight,
      percentX:(tag.offsetLeft+tag.offsetWidth/2)/container.offsetWidth,
      percentY:(tag.offsetTop+tag.offsetHeight)/container.offsetHeight,
      id:info.id,
      buildingId: info.buildingId,
      eb1: info.eb1,// 组团id
      estateId: info.estateId,
      saleId: info.saleId,
      labelName: info.labelName + '|' + info.saleName
    }
    //将坐标信息存至sessionStorage
    let isHas = false;
    if(sessionStorage.getItem('imgLocated')){
      let arr = JSON.parse(sessionStorage.getItem('imgLocated'));
      arr.map(function(item){
        if(item.id == locatedInfo.id){
          item.addressX = locatedInfo.addressX;
          item.addressY = locatedInfo.addressY;
          item.percentX = locatedInfo.percentX;
          item.percentY = locatedInfo.percentY;
          item.buildingId = locatedInfo.buildingId;
          item.estateId = locatedInfo.estateId;
          item.labelName = locatedInfo.labelName;
          item.saleId = locatedInfo.saleId;
          item.eb1 = locatedInfo.eb1;// 组团id
          isHas = true;
        }
      })
      if(isHas){
        sessionStorage.setItem('imgLocated',JSON.stringify(arr))
      }else{
        arr.push(locatedInfo);
        sessionStorage.setItem('imgLocated',JSON.stringify(arr));
      }
    }else{
      let arr = new Array();
      arr.push(locatedInfo);
      sessionStorage.setItem('imgLocated',JSON.stringify(arr));
    }
  }
  container.onmouseup = function(){//鼠标在图片容器上抬起移除鼠标移动监听事件
    container.removeEventListener('mousemove',_move)
  }
  document.body.onmouseup = function(){//鼠标在body上抬起移除鼠标移动监听事件
    container.removeEventListener('mousemove',_move)
  }
}
