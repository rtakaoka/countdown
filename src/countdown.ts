export function setupCountdown(element: HTMLButtonElement) {

  const transformRemainingTime = (remainingInSeconds: number) => {
    let remainingTime = remainingInSeconds
    let days = Math.trunc(remainingTime / (3600 * 24))
    remainingTime = remainingTime % (3600 * 24)
    let hours = Math.trunc(remainingTime / 3600)
    remainingTime = remainingTime % 3600
    let minutes = Math.trunc(remainingTime / 60)
    remainingTime = remainingTime % 60
    let seconds = Math.trunc(remainingTime)

    return [days, hours, minutes, seconds]
  }

  const showRemainingTime = ([days, hours, minutes, seconds]: number[], paragraphElement: HTMLParagraphElement, countdownWrapper: HTMLDivElement, inputWrapper: HTMLDivElement) => {
    paragraphElement.textContent = `Faltam ${days} dia(s), ${hours} hora(s), ${minutes} minuto(s) e ${seconds} segundos.`
    countdownWrapper.removeAttribute('hidden')
    inputWrapper.style.display = 'none'
  }
  
  const setCountdown = () => {
    let datetime = new Date(document.querySelector<HTMLInputElement>('#datetime')!.value)
    let currentDatetime = new Date()
    let remainingTime = Math.trunc((datetime.getTime() - currentDatetime.getTime()) / 1000)
    let paragraphElement = document.querySelector<HTMLParagraphElement>('#countdown-message')!
    let countdownWrapper = document.querySelector<HTMLDivElement>('#countdown-wrapper')!
    let inputWrapper = document.querySelector<HTMLDivElement>('#input-wrapper')!

    const intervalId = setInterval(() => {
      remainingTime = remainingTime - 1
      if(remainingTime > 0) {
        showRemainingTime(transformRemainingTime(remainingTime), paragraphElement, countdownWrapper, inputWrapper)
      } else {
        paragraphElement.textContent = `Faltam 0 dia(s), 0 hora(s), 0 minuto(s) e 0 segundos.`
        clearInterval(intervalId)
      }
    }, 1000)
  }

  element.addEventListener('click', setCountdown)
}