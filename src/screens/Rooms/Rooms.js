import React from 'react'
import MyFooter from '../../components/Footer/MyFooter'
import MyCopyright from '../../components/Copyright/MyCopyright'
import MyHeader from '../../components/Header/MyHeader'
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs'
import MyOverView from '../../components/OverView/MyOverView'
import MyShop from '../../components/Shop/MyShop'

const Rooms = () => {

    const contents = [
        "Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, sit amet imperdiet leo posuere. Nam id nisl scelerisque, commodo ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse faucibus ac turpis et tincidunt. Cras non quam mauris. Nullam commodo a urna sed faucibus. Nam dolor odio, eleifend quis dictum aliquet, ultrices vel purus.",
        "Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum nunc ac dui faucibus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin hendrerit sit amet est at laoreet. Nam auctor rhoncus accumsan. Morbi et turpis ac ligula tempor tincidunt.",
        "Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, sit amet imperdiet leo posuere. Nam id nisl scelerisque, commodo ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse faucibus ac turpis et tincidunt. Cras non quam mauris. Nullam commodo a urna sed faucibus. Nam dolor odio, eleifend quis dictum aliquet, ultrices vel purus.",
        "Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum nunc ac dui faucibus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin hendrerit sit amet est at laoreet. Nam auctor rhoncus accumsan. Morbi et turpis ac ligula tempor tincidunt.",
        "Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, sit amet imperdiet leo posuere. Nam id nisl scelerisque, commodo ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse faucibus ac turpis et tincidunt. Cras non quam mauris. Nullam commodo a urna sed faucibus. Nam dolor odio, eleifend quis dictum aliquet, ultrices vel purus.",
        "Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum nunc ac dui faucibus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin hendrerit sit amet est at laoreet. Nam auctor rhoncus accumsan. Morbi et turpis ac ligula tempor tincidunt.",
        "Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, sit amet imperdiet leo posuere. Nam id nisl scelerisque, commodo ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse faucibus ac turpis et tincidunt. Cras non quam mauris. Nullam commodo a urna sed faucibus. Nam dolor odio, eleifend quis dictum aliquet, ultrices vel purus.",
        "Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum nunc ac dui faucibus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin hendrerit sit amet est at laoreet. Nam auctor rhoncus accumsan. Morbi et turpis ac ligula tempor tincidunt.",
        "Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, sit amet imperdiet leo posuere. Nam id nisl scelerisque, commodo ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse faucibus ac turpis et tincidunt. Cras non quam mauris. Nullam commodo a urna sed faucibus. Nam dolor odio, eleifend quis dictum aliquet, ultrices vel purus.",
        "Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum nunc ac dui faucibus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin hendrerit sit amet est at laoreet. Nam auctor rhoncus accumsan. Morbi et turpis ac ligula tempor tincidunt."
    ]

    return (
        <div>
            <MyHeader/>
            <MyBreadCrumbs/>
            <MyOverView title="Phòng" content={contents}/>
            <MyShop/>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default Rooms
