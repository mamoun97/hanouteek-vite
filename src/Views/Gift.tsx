import styled from 'styled-components'

type PropsStype={
    p:string
}
const DivC = styled.div`
display: flex;
justify-content: center;
min-height: 400px;
padding-top: 100px;
overflow: hidden;
width: 100%;
transform: scale(.7);

.box {
  position: relative;
}
.box::before {
  content: "";
  /* width: 440px;
  height: 440px; */
  background-color: #89cff0;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  border-radius: 50%;
}
.box-body {
  position: relative;
  height: 200px;
  width: 200px;
  margin-top: 123.3333333333px;
  background-color: #cc231e;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5%;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.3);
  background: linear-gradient(#762c2c,#ff0303);
}
.img{
    opacity: 1;
  z-index: 0;
  transform: translateY(-80px); 
  transition: all 0.5s;
  margin: 0 auto;
  display: block;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: trImage .8s ;
  animation-delay: .5s;
  animation-fill-mode: backwards;
  z-index: 0;
}
.img .bd{
    position: absolute;
    top:0;
    left: -100%;
    right:-100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.box-body {
  cursor: pointer;
  -webkit-animation: box-body 1s forwards ease-in-out;
          animation: box-body 1s forwards ease-in-out;
}

@keyframes trImage{
    from{
        opacity: 0;
  transform: translateY(280px) scale(.4);
    }
    50%{
        opacity: 1;
  z-index: 0;
  transform: translateY(-90px) scale(1.2); 
    }
    to{
        opacity: 1;
  z-index: 0;
  transform: translateY(-80px); 
    }
}
.box-body .box-lid {
  -webkit-animation: box-lid 1s forwards ease-in-out;
          animation: box-lid 1s forwards ease-in-out;
}
.box-body .box-bowtie::before {
  -webkit-animation: box-bowtie-left 1.1s forwards ease-in-out;
          animation: box-bowtie-left 1.1s forwards ease-in-out;
}
.box-body .box-bowtie::after {
  -webkit-animation: box-bowtie-right 1.1s forwards ease-in-out;
          animation: box-bowtie-right 1.1s forwards ease-in-out;
}
.box-body::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  width: 50px;
  background: linear-gradient(var(--primary-color),#ffffff)
}
.box-lid {
  position: absolute;
  z-index: 10;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  bottom: 90%;
  height: 40px;
  background-color: #cc231e;
  height: 40px;
  width: 220px;
  border-radius: 5%;
  box-shadow: 0 8px 4px -4px rgba(0, 0, 0, 0.3);
}
.box-lid::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  width: 50px;
  background: linear-gradient(#fff,var(--primary-color))
}
.box-bowtie {
  z-index: 1;
  height: 100%;
}
.box-bowtie::before, .box-bowtie::after {
  content: "";
  width: 83.3333333333px;
  height: 83.3333333333px;
  border: 16.6666666667px solid var(--primary-color);
  border-radius: 50% 50% 0 50%;
  position: absolute;
  bottom: 99%;
  z-index: -1;
}
.box-bowtie::before {
  left: 50%;
  -webkit-transform: translateX(-100%) skew(10deg, 10deg);
          transform: translateX(-100%) skew(10deg, 10deg);
}
.box-bowtie::after {
  left: 50%;
  -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
          transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
}

@-webkit-keyframes box-lid {
  0%,
  42% {
    -webkit-transform: translate3d(-50%, 0%, 0) rotate(0deg);
            transform: translate3d(-50%, 0%, 0) rotate(0deg);
  }
  60% {
    -webkit-transform: translate3d(-85%, -230%, 0) rotate(-25deg);
            transform: translate3d(-85%, -230%, 0) rotate(-25deg);
  }
  90%, 100% {
    -webkit-transform: translate3d(-119%, 225%, 0) rotate(-70deg);
            transform: translate3d(-119%, 225%, 0) rotate(-70deg);
  }
}

@keyframes box-lid {
  0%,
  42% {
    -webkit-transform: translate3d(-50%, 0%, 0) rotate(0deg);
            transform: translate3d(-50%, 0%, 0) rotate(0deg);
  }
  60% {
    -webkit-transform: translate3d(-85%, -230%, 0) rotate(-25deg);
            transform: translate3d(-85%, -230%, 0) rotate(-25deg);
  }
  90%, 100% {
    -webkit-transform: translate3d(-119%, 225%, 0) rotate(-70deg);
            transform: translate3d(-119%, 225%, 0) rotate(-70deg);
  }
}
@-webkit-keyframes box-body {
  0% {
    -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
            transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
  25% {
    -webkit-transform: translate3d(0%, 25%, 0) rotate(20deg);
            transform: translate3d(0%, 25%, 0) rotate(20deg);
  }
  50% {
    -webkit-transform: translate3d(0%, -15%, 0) rotate(0deg);
            transform: translate3d(0%, -15%, 0) rotate(0deg);
  }
  70% {
    -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
            transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
}
@keyframes box-body {
  0% {
    -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
            transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
  25% {
    -webkit-transform: translate3d(0%, 25%, 0) rotate(20deg);
            transform: translate3d(0%, 25%, 0) rotate(20deg);
  }
  50% {
    -webkit-transform: translate3d(0%, -15%, 0) rotate(0deg);
            transform: translate3d(0%, -15%, 0) rotate(0deg);
  }
  70% {
    -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
            transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
}
@-webkit-keyframes box-bowtie-right {
  0%,
  50%,
  75% {
    -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
            transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
  }
  90%,
  100% {
    -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
            transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
    box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.3);
  }
}
@keyframes box-bowtie-right {
  0%,
  50%,
  75% {
    -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
            transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
  }
  90%,
  100% {
    -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
            transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
    box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.3);
  }
}
@-webkit-keyframes box-bowtie-left {
  0% {
    -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
            transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
  50%,
  75% {
    -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
            transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
  }
  90%,
  100% {
    -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
            transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
}
@keyframes box-bowtie-left {
  0% {
    -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
            transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
  50%,
  75% {
    -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
            transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
  }
  90%,
  100% {
    -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
            transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
}
`
export default function Gift({promo}:{promo:number}) {
  

    return <DivC>
        <div className="box">
            <div className="img">
                <div className="bd text-4xl max-[570px]:text-2xl">
                    <h1 className='' >
                    Toutes Nos Félicitations
                    </h1>
                    <h1 className='font-bold text-primary max-[600px]:text-4xl'  >
                        -{promo} DZD
                    </h1>
                </div>

            </div>
            <div className="box-body">

                <div className="box-lid">

                    <div className="box-bowtie"></div>

                </div>
            </div>
        </div>
    </DivC>
}