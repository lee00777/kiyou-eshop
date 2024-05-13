import React from 'react';
import TrendCard from './TrendCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

let mock = [
  {image:"/images/best.jpeg",trends:"/best", description:"BEST❣️"},{image:"/images/new.jpeg",trends:"/new", description:"NEW🌿"},
  {image:"/images/hotsales.jpeg",trends:"/sales", description:"HOT SALES🔥"},{image:"/images/summer.jpeg", trends:"/products/accessories",description:"SUMMER☀️"},
  {image:"/images/vacation.jpeg", trends:"/products/dresses",description:"VACATION ⛱️"}
];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function Trends() {
  // [1] trends라는 database에 가서 정보들 가져오기
  // const { productsQuery: { isPending, error, data:trends}} = useProducts();☀️

  return (
    <div className='w-full my-40 text-description'>
      <section className='text-center w-4/6 mx-auto my-40'>
        <h2 className='text-2xl'><span className='font-bold'>KIYOU</span> is..</h2>
        <p className='mt-5'>
          <b>KIYOU</b> is a special space for women in their 20s and 30s. <br />
          We offer a variety of clothing styles that allow all women to express themselves. <br />
          From casual to elegant formal styles, we guarantee high quality at a reasonable price. <br />
        </p>
      </section>


      <section className='mt-20 py-20 w-full bg-trend '>
        {/* { isPending && <p>Loading...</p> }
        { error && <p>{error}</p>}
        <ul className=' max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          { products && products.map(product => <ProductCard key={product.id} product={product}/>)}
        </ul> */}
        <Carousel 
          className='w-5/6 flex mx-auto'
          swipeable={true}
          draggable={false}
          responsive={responsive}
          arrows
          infinite
          autoPlay={true}
          // autoPlaySpeed={4000}
          // keyBoardControl={true}
          customTransition="all 0.5s linear"
          transitionDuration={500}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay>
          {mock.map((item)=>{
              return <TrendCard key={item.id} image={item.image} trends={item.trends} description={item.description}/>
            })}
        </Carousel>
      </section>
    </div>
  );
}

