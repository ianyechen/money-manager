//Tutorials followed:
//https://stackoverflow.com/questions/33924150/how-to-access-canvas-context-in-react
//https://stackoverflow.com/questions/27736288/how-to-fill-the-whole-canvas-with-specific-color
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
//https://gist.github.com/prof3ssorSt3v3/7f16fe9397c013d364f2d4484cad3ca8
//https://stackoverflow.com/questions/30790010/html-canvas-hover-text
//https://stackoverflow.com/questions/6270785/how-to-determine-whether-a-point-x-y-is-contained-within-an-arc-section-of-a-c
//https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing



import React, { useRef, useEffect, useReducer } from 'react'

class PieChart extends React.Component {
    state = {
        canvasWidth: 600,
        canvasHeight: 600,
    }
    constructor(props) {
        super(props);
        this.width = 0;
        this.height = 0;
        this.pieChartRef = React.createRef();
    }
    
    // let elem = document.querySelector('canvas');
    // let rect = elem.getBoundingClientRect();
    // console.log(rect);

    componentDidMount() {
        console.log("Did mount!")
        this.context = this.pieChartRef.current.getContext('2d');
        // let elem = document.querySelector('canvas');
        // let rect = elem.getBoundingClientRect();
        // console.log(rect);
        let slices = [];
        const {stockList} = this.props
        console.log(stockList)
        
        let total = stockList.reduce( (ttl, stock) => {
            return ttl + (stock.avgCost * stock.quantity)
        }, 0);
        console.log("total")
        console.log(total)
        let startAngle = 0; 
        let radius = 120;
        let cx = this.state.canvasWidth/2;
        let cy = this.state.canvasHeight/2;
        const randomHexColorCode = () => {
            return "#" + Math.random().toString(16).slice(2, 8)
        };

        stockList.forEach(element => {
            console.log("Drawing slice")
            this.context.lineWidth = 1;
            this.context.strokeStyle = '#fafafa';
            this.context.fillStyle = randomHexColorCode();
            this.context.beginPath();
            
            // draw the pie wedges
            let endAngle = (((element.avgCost * element.quantity) / total) * Math.PI * 2) + startAngle;
            this.context.moveTo(cx, cy);
            this.context.arc(cx, cy, radius, startAngle, endAngle);
            this.context.lineTo(cx, cy);
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
            
            // add the labels
            this.context.beginPath();
            this.context.font = '20px Helvetica, Calibri';
            this.context.textAlign = 'center';
            this.context.fillStyle = 'rebeccapurple';
            // 1.5 * radius is the length of the Hypotenuse
            let theta = (startAngle + endAngle) / 2;
            let deltaY = Math.sin(theta) * 1.5 * radius;
            let deltaX = Math.cos(theta) * 1.5 * radius;
            this.context.fillText(element.name, deltaX+cx, deltaY+cy);
            let percentage = Math.round(+((element.avgCost*element.quantity*100)/total));
            this.context.fillText(percentage + "%", (deltaX*1.3)+cx, (deltaY*1.4)+cy);
            this.context.closePath();
            

            //store the slice information
            slices.push({ 
                    "name" : element.name,
                    "cx" : cx,
                    "cy" : cy,
                    "colour" : this.context.fillStyle,
                    "radius" : radius,
                    "startAngle" : startAngle,
                    "endAngle": endAngle,
            });
            startAngle = endAngle;
        });

        document.addEventListener('mousemove', (e) => {
            let mouseX=parseInt(e.clientX);
            let mouseY=parseInt(e.clientY);
            // console.log(e.pageX)
            // console.log(e.pageY)
            // console.log(e.clientX)
            // console.log(e.clientY)

                    
            for(let i=0;i<slices.length;i++){
                let s=slices[i];
            
                // define the shape path we want to test against the mouse position
                // defineShape(s.points);
                
                //check the angle
                let angleOk = false;
                let angle = Math.atan(mouseY - cy,mouseX - cx);
                // let mouseAngle = Math.atan(e.pageY - cy,e.pageX - cx);
         
                if(s.startAngle < s.endAngle && s.startAngle < angle && angle < s.endAngle){
                    //console.log("Angle ok")
                    angleOk = true;


                }else if(s.startAngle > s.endAngle){
                    if(angle > s.startAngle || angle < s.endAngle){
                        //console.log("Angle ok")
                        angleOk = true;



                    }
                }
                
                //check the radius
                let distanceOk = false;
                //this distance is wrong:
                let distance = Math.sqrt( ((mouseX - cx) * (mouseX - cx)) +  ((mouseY - cy) * (mouseY - cy)) );
                
                
                
                console.log(mouseX)
                console.log(mouseY)
                // console.log(cx)
                // console.log(cy)


                if(distance < s.radius){
                    distanceOk = true;
                    // console.log(distance)
                    // console.log("Distance ok")
                }

                //all the slices 
                if(angleOk && distanceOk){
                  // if yes, fill the shape in red
                  console.log("hovering over slice")

                //   s.drawcolor='red';
                  
                }else{
                  // if no, fill the shape with blue
                //   s.drawcolor=s.colour;
                }
                
              }
        }); 
    }

    componentDidUpdate() {
        console.log("Did update!")
        let elem  = document.querySelector('canvas');
        let rect = elem.getBoundingClientRect();
        console.log(rect);
        console.log(rect.x)
        console.log(rect.y)
        console.log(rect.width)
        console.log(rect.height)
        this.context = this.pieChartRef.current.getContext('2d');
        const context = this.context;
        context.clearRect(rect.x, rect.y, rect.width, rect.height);
        context.beginPath();
        

        
        //context.save();
        //context.setTransform(1, 0, 0, 1, 0, 0);
        //context.beginPath();
       

        
        //context.restore();
        
        
        let slices = [];
        const {stockList} = this.props
        console.log(stockList)
        
        let total = stockList.reduce( (ttl, stock) => {
            return ttl + (stock.avgCost * stock.quantity)
        }, 0);
        console.log("total")
        console.log(total)
        let startAngle = 0; 
        let radius = 120;
        let cx = this.state.canvasWidth/2;
        let cy = this.state.canvasHeight/2;
        const randomHexColorCode = () => {
            return "#" + Math.random().toString(16).slice(2, 8)
        };

        

        stockList.forEach(element => {
            console.log("Drawing slice")
            this.context.lineWidth = 1;
            this.context.strokeStyle = '#fafafa';
            this.context.fillStyle = randomHexColorCode();
            this.context.beginPath();
            
            // draw the pie wedges
            let endAngle = (((element.avgCost * element.quantity) / total) * Math.PI * 2) + startAngle;
            this.context.moveTo(cx, cy);
            this.context.arc(cx, cy, radius, startAngle, endAngle);
            this.context.lineTo(cx, cy);
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
            
            // add the labels
            this.context.beginPath();
            this.context.font = '20px Helvetica, Calibri';
            this.context.textAlign = 'center';
            this.context.fillStyle = 'rebeccapurple';
            // 1.5 * radius is the length of the Hypotenuse
            let theta = (startAngle + endAngle) / 2;
            let deltaY = Math.sin(theta) * 1.5 * radius;
            let deltaX = Math.cos(theta) * 1.5 * radius;
            this.context.fillText(element.name, deltaX+cx, deltaY+cy);
            let percentage = Math.round(+((element.avgCost*element.quantity*100)/total));
            this.context.fillText(percentage + "%", (deltaX*1.3)+cx, (deltaY*1.4)+cy);
            this.context.closePath();
            

            //store the slice information
            slices.push({ 
                    "name" : element.name,
                    "cx" : cx,
                    "cy" : cy,
                    "colour" : this.context.fillStyle,
                    "radius" : radius,
                    "startAngle" : startAngle,
                    "endAngle": endAngle,
            });
            startAngle = endAngle;
        });

        document.addEventListener('mousemove', (e) => {
            let mouseX=parseInt(e.clientX);
            let mouseY=parseInt(e.clientY);
            // console.log(e.pageX)
            // console.log(e.pageY)
            // console.log(e.clientX)
            // console.log(e.clientY)

                    
            for(let i=0;i<slices.length;i++){
                let s=slices[i];
            
                // define the shape path we want to test against the mouse position
                // defineShape(s.points);
                
                //check the angle
                let angleOk = false;
                let angle = Math.atan(mouseY - cy,mouseX - cx);
                // let mouseAngle = Math.atan(e.pageY - cy,e.pageX - cx);
         
                if(s.startAngle < s.endAngle && s.startAngle < angle && angle < s.endAngle){
                    //console.log("Angle ok")
                    angleOk = true;


                }else if(s.startAngle > s.endAngle){
                    if(angle > s.startAngle || angle < s.endAngle){
                        //console.log("Angle ok")
                        angleOk = true;



                    }
                }
                
                //check the radius
                let distanceOk = false;
                //this distance is wrong:
                let distance = Math.sqrt( ((mouseX - (cx+rect.x)) * (mouseX - (cx+rect.x))) +  ((mouseY - (cy+rect.y)) * (mouseY - (cy+rect.y))) );
                
                
                
                console.log(mouseX)
                console.log(mouseY)
                // console.log(cx)
                // console.log(cy)


                if(distance < s.radius){
                    distanceOk = true;
                    // console.log(distance)
                    console.log("Distance ok")
                }

                //all the slices 
                if(angleOk && distanceOk){
                  // if yes, fill the shape in red
                  console.log("hovering over slice")

                //   s.drawcolor='red';
                  
                }else{
                  // if no, fill the shape with blue
                //   s.drawcolor=s.colour;
                }
                
              }
        }); 
    }
    
    render() {
        return (
          <canvas ref={this.pieChartRef} width = {this.state.canvasWidth} height = {this.state.canvasHeight} />
       )
    }
}

export default PieChart