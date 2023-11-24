import { Twitter } from '@/components/icons'
import { TeamMember } from '@/components/team-member'
import { Main } from '@/components/ui/main'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function IndexPage() {
  return (
    <Main>
      <div className="flex gap-6 items-baseline">
        <h1
          className={cn(
            fontSans.className,
            'flex gap-6 items-center text-[40px] sm:text-[56px] lg:text-[72px] tracking-tighter font-bold',
          )}
        >
          <Image
            alt="logo"
            width={60}
            height={60}
            src="/logo.jpg"
            className="w-10 sm:w-12 lg:w-16 -mr-3 -mt-1 sm:-mt-0 sm:-mr-3 lg:-mt-1 lg:-mr-1"
          />
          kennel capital{' '}
        </h1>
      </div>

      <p className="text-[20px] lg:text-[24px] text-muted-foreground">
        We{"'"}re just a bunch of traders, developers <br /> spending time in
        the kennel.
      </p>
      <h1 className={cn('mt-14 text-[40px] tracking-tighter font-bold')}>
        team
      </h1>
      <div className="mt-4 flex gap-x-12 gap-y-5 md:gap-y-8 flex-wrap">
        <TeamMember
          src="https://pbs.twimg.com/profile_images/3197981582/ec9712dbbcdc775db064abcf3808eef0_400x400.jpeg"
          username="PuggyTrades"
          caption="The original Puggy. The master of pair trading."
          role="Founder"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1633105915644727296/OzZnbV0V_400x400.jpg"
          username="artikokus"
          caption="Our beloved father. Hummus enthusiast."
          role="Founder"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1500625781617270789/ciFsRts5_normal.jpg"
          username="chillichelli"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1571118779073024001/7tRKlkOU_400x400.jpg"
          username="Moudinho3"
          caption="Founder of the Adani candle. Considers himself RunnerXBT's biggest fan."
          role="Trader"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1511809533093498888/I2Q1U22u_400x400.jpg"
          username="DipBender"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1717803527030947840/vl9ehi0u_400x400.jpg"
          username="seekoutliers"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1726947490224619520/VIr_xx4R_400x400.jpg"
          username="0xJezza"
        />

        <TeamMember
          src="https://pbs.twimg.com/profile_images/1702881138099023872/euO4Tk6m_400x400.jpg"
          username="PC_PR1NCIPAL"
        />

        <TeamMember
          src="https://pbs.twimg.com/profile_images/1587867915516346371/v47kdgLs_400x400.jpg"
          username="trdrtur"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1612598199339859968/HhyyVX1z_400x400.jpg"
          username="GiganticRebirth"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1700605428336406528/pAmxFUPL_400x400.jpg"
          username="boink__boink"
        />

        <TeamMember
          src="https://pbs.twimg.com/profile_images/1698657083007053824/OwlGf5zC_400x400.jpg"
          username="dubaixbt_"
        />
        <TeamMember
          src="https://pbs.twimg.com/profile_images/1596937469525565440/14QzvEsy_400x400.jpg"
          username="art_xbt"
        />
        <TeamMember
          username="FilthyBulla"
          src="https://pbs.twimg.com/profile_images/1456896771481739265/dBUxn8H1_400x400.jpg"
        />
        <TeamMember
          username="0xMesmerizing"
          src="https://pbs.twimg.com/profile_images/1694087396713811968/fnLZpXaj_400x400.jpg"
        />
        <TeamMember
          username="appuleius104"
          src="https://pbs.twimg.com/profile_images/1711727033623953408/gZ66M-ek_400x400.jpg"
        />
        <TeamMember username="Kadak" hasTwitter={false} />
      </div>
      <h1 className={cn('mt-14 mb-4 text-[40px] tracking-tighter font-bold')}>
        portfolio
      </h1>
      <a
        rel="noopener noreferrer"
        className="text-xl text-blue cursor-pointer hover:underline font-bold"
        target="_blank"
        href="https://twitter.com/kennelcapital"
      >
        /EMPTY
      </a>
      <br />
      <a
        rel="noopener noreferrer"
        className="text-xl text-blue cursor-pointer hover:underline font-bold"
        target="_blank"
        href="https://twitter.com/kennelcapital"
      >
        /FOR_NOW
      </a>
      <h1 className={cn('mt-14 mb-4 text-[40px] tracking-tighter font-bold')}>
        contact
      </h1>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://twitter.com/kennelcapital"
      >
        <Twitter
          size={32}
          color="#1DA1F2"
          fill="currentColor"
          className="text-[#1DA1F2]"
        />
      </a>
    </Main>
  )
}
