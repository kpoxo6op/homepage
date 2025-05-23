interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'New Zealand Then and Now',
    description: `Photographs with sliders that compare past and present views of locations across New Zealand, showing how places have changed over time`,
    imgSrc: '/static/images/nz-thennow.jpg',
    href: 'https://thennow.nz',
  },
  {
    title: 'Markdown to PDF CV builder',
    description: `Create CV in PDF format markdown`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/kpoxo6op/cv',
  },
  {
    title: 'Soyspray',
    description: `Kubernetes Cluster Powered by Kubespray`,
    imgSrc: '/static/images/soy-project-banner-1000.jpg',
    href: '/blog/soyspray-series.mdx',
  },
]

export default projectsData
