import avatar from '@/application/assets/images/avatar.jpg'

export const Logo = () => {
  return (
    <>
      <span className="sr-only">Your Company</span>
      <img alt="" src={avatar} className="h-8 w-auto rounded-4xl" />
    </>
  )
}
