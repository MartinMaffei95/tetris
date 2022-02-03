
document.addEventListener('DOMContentLoaded', ()=>{
    const width = 10;
    const grid = document.querySelector('.grid');
    let cuadrados = Array.from(document.querySelectorAll('.grid div'));
    let siguienteRandom = 0;
    let timerID;
    

    const ContadorPuntaje = document.querySelector('#puntos');
    const inicioBtn = document.querySelector('#inicio')


    let puntaje = 0;
    //FORMAS
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
      ]
    
      const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ]
    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]

      const Tetrominos = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]
      
      
      let random = Math.floor(Math.random()*Tetrominos.length)
      let rotacionActual = 0
      let posicionActual = 5
      let tetrominoActual = Tetrominos[random][rotacionActual]

      console.log(Tetrominos)

      //dibujar tetromino

      const dibujartetromino= () => {
        tetrominoActual.forEach(i =>{
            cuadrados[posicionActual + i].classList.add('tetromino')
        })
      }
      //borrar tetromino
      const borrartetromino= () => {
        tetrominoActual.forEach(i =>{
            cuadrados[posicionActual + i].classList.remove('tetromino')
        })
      }

    

    //movimiento hacia abajo

      const moverAbajo = ()=>{
        borrartetromino()
        posicionActual+= width
        dibujartetromino()
        frenar()
      }
      

      // Movimientos con el teclado
      const teclado =(e)=>{
        switch(e.keyCode){
          case 37: moverIzq()
            break;
          case 38: rotarTet() 
            break;
          case 39: moverDer()
            break;
          case 40: moverAbajo()
            break;
        }
      }

      //Funcion frenar
    const frenar = ()=>{
        if(tetrominoActual.some( i => cuadrados[posicionActual + i + width].classList.contains('ultimo'))){
            tetrominoActual.forEach(i =>{cuadrados[posicionActual + i].classList.add('ultimo')})

            //cae un nuevo tetromino
            random = siguienteRandom
            siguienteRandom = Math.floor(Math.random() * Tetrominos.length) 
            posicionActual = 5
            tetrominoActual = Tetrominos[random][rotacionActual]
            
            dibujartetromino()
            dibujarEnDisplay()
            sumarPuntaje()
        }
    }
    
    //Funcion Mover - Izquierda
    const moverIzq = ()=>{
        borrartetromino()
        const tocaParedIzquierda = tetrominoActual.some(i => (posicionActual + i ) % width === 0)

        if(!tocaParedIzquierda) posicionActual -= 1;

        if(tetrominoActual.some(i => cuadrados[posicionActual + i].classList.contains('ultimo'))){
          posicionActual +=1
        }

        dibujartetromino()
    }

    const moverDer = ()=>{
      borrartetromino()
      const tocaParedDerecha = tetrominoActual.some(i => (posicionActual + i ) % width === width-1)

      if(!tocaParedDerecha) posicionActual += 1;

      if(tetrominoActual.some(i => cuadrados[posicionActual + i].classList.contains('ultimo'))){
        posicionActual -=1
      }

      dibujartetromino()
  }

  //Rotar tetromino
  const rotarTet = ()=>{
    borrartetromino()
    rotacionActual++
    if(rotacionActual === tetrominoActual.length){
      rotacionActual = 0
    }
    tetrominoActual = Tetrominos[random][rotacionActual]
    dibujartetromino()
  }

    document.addEventListener('keyup',teclado)

      const touch=(e)=>{
        let distanciaTop = e.touches[0].target.offsetTop;
        let distanciaIzq = e.touches[0].target.offsetLeft;
        console.log(distanciaTop,distanciaIzq)

        if(distanciaTop <= 140){ //Parte superior
          rotarTet() 
        }else if(distanciaTop >= 380){ //Parte inferior
          moverAbajo()
        }else if(distanciaTop < 380 && distanciaTop > 140 && distanciaIzq < 88){ // Parte Central Izq
          moverIzq()
        }else if(distanciaTop < 380 && distanciaTop > 140 && distanciaIzq > 88){ // Parte Central Der
          moverDer()
        }
        
      }
      
      grid.addEventListener('touchstart',touch)


      // switch(e.keyCode){
      //   case 37: moverIzq()
      //     break;
      //   case 38: rotarTet() 
      //     break;
      //   case 39: moverDer()
      //     break;
      //   case 40: moverAbajo()
      //     break;

  const cubosVisorDetetromino = document.querySelectorAll('.mini-grid div');
  const visorWidth = 4
  let visorIndex = 0


  //tetromino sin rotar

  const siguientetetromino = [
    [1,visorWidth+1,visorWidth*2+1,2], // tetromino L
    [0,visorWidth,visorWidth+1,visorWidth*2+1],// tetromino Z
    [1,visorWidth,visorWidth+1,visorWidth+2],// tetromino T
    [0,1,visorWidth,visorWidth+1,],// tetromino O
    [1,visorWidth+1,visorWidth*2+1,visorWidth*3+1]// tetromino L
  ]
  // Mostrar tetromino en visor
  const dibujarEnDisplay = ()=>{
    cubosVisorDetetromino.forEach(cubo => {
      cubo.classList.remove('tetromino')
    })
    siguientetetromino[siguienteRandom].forEach(i =>{
      cubosVisorDetetromino[visorIndex + i].classList.add('tetromino')
    })
  }

  //Boton

  inicioBtn.addEventListener('click',()=>{
    if(timerID){
      clearInterval(timerID)
      timerID=null
    }else{
      dibujartetromino()
      timerID= setInterval(moverAbajo,1000);
      siguienteRandom= Math.floor(Math.random() * Tetrominos.length);
      dibujarEnDisplay()
    }
  })

  //Puntaje
  const sumarPuntaje =()=>{
    for(let i = 0; i < 199; i +=width){
      const fila = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]
      
      if(fila.every(i => cuadrados[i].classList.contains('ultimo'))){
        puntaje += 10;
        ContadorPuntaje.innerHTML= puntaje;
        fila.forEach(i =>{
        cuadrados[i].classList.remove('ultimo');
        cuadrados[i].classList.remove('tetromino');
        })
        const cuadradosCortados = cuadrados.splice(i,width)
        cuadrados = cuadradosCortados.concat(cuadrados)
        cuadrados.forEach(celda => grid.appendChild(celda))
      }
    }
  }

})


