import Header from "./_components/Header"

export const metadata = {
  title: 'Health Care Dashboard',
  description: 'Health Care Dashboard',
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
