
document.addEventListener('DOMContentLoaded', ()=>{
    const width = 10;
    const grid = document.querySelector('.grid');
    let cuadrados = Array.from(document.querySelectorAll('.grid div'));
    let siguienteRandom = 0;
    let timerID;

    const ContadorPuntaje = document.querySelector('#puntos');
    const inicioBtn = document.querySelector('#inicio')

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

})


