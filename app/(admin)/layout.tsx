import Header from "./_components/Header"

export const metadata = {
  title: 'Health Care Admin',
  description: 'Health Care Admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  )
}
