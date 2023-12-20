const Cohesion = () => {
  return (
    <script
      async
      dangerouslySetInnerHTML={{
        __html: `
        window.OnetrustActiveGroups=[];

        !function(co,h,e,s,i,o,n){var d='documentElement';var a='className';h[d][a]+=' preampjs fusejs';
        n.k=e;co._Cohesion=n;co._Preamp={k:s,start:new Date};co._Fuse={k:i};co._Tagular={k:o};
        [e,s,i,o].map(function(x){co[x]=co[x]||function(){(co[x].q=co[x].q||[]).push([].slice.call(arguments))}});
        h.addEventListener('DOMContentLoaded',function(){co.setTimeout(function(){
        var u=h[d][a];h[d][a]=u.replace(/ ?preampjs| ?fusejs/g,'')},3e3);
        co._Preamp.docReady=co._Fuse.docReady=!0});var z=h.createElement('script');
        z.async=1;z.src='https://cdn.cohesionapps.com/cohesion/cohesion-latest.min.js';h.head.appendChild(z);}
        (window,document,'cohesion','preamp','fuse','tagular',{
          tagular: {
            apiKey: "2646f3b4-2a12-48ac-979d-ad332d8e53a6.be7259f3-a108-4532-b2d6-cabba9185e07",
            writeKey: "wk_1NT297N9odoW0CqWvYg7phqu6Jl",
            sourceKey: "src_1NT295J0sRek2E2S9wmewl1hSjr",
            multiparty: true,
            taggy: { enabled: true }
          },
          consent: {
            required: false
          }
        })
      `,
      }}
    />
  )
}

export default Cohesion
