    const btczUrl = `https://btcz.solopool.org/api/accounts/t1Lb4tyQ7cZhy5iY5e9PAtTncTDyy4XHwRi`;
	const tentUrl = 'https://tent.solopool.org/api/accounts/s1h9RZg8ZiXijCGLqtwAzqA3rbXL7SUu3Mf';
	const fluxUrl = 'https://flux.solopool.org/api/accounts/t1KjKJY9MBMiVYJCPrEuayr5xwMjk6Cf7NS';


async function getHashrate() {

	const res = await fetch(btczUrl);
    const data = await res.json();
    console.log(data)
    if (!data) {
        hashrateCurrent.textContent = "Sorry, pool is down";
        hashrate.textContent = ' :-( ';
    } else {
    const dateNow = new Date();
    hashrateCurrent.textContent = `${ data.currentHashrate }`;
    hashrate.textContent = `(${ data.hashrate })`;
    const lastShareDate = new Date(data.stats.lastShare * 1000);
    const TimeDelta = (dateNow - lastShareDate) / 1000;
    const TimeLast = TimeDelta > 60 ? `${(TimeDelta / 60).toFixed(0)}m` : `${TimeDelta.toFixed(0)}s`;
    const lastShareMin = TimeDelta > 600 ? lastShareDate.toLocaleTimeString() : TimeLast;
    lastShare.textContent = `${ lastShareMin }`;
        if (data.workers.nv4.offline || data.workers.nv4.dead) hashrateBlock.classList.add('offline');
            else {hashrateBlock.classList.remove('offline')}
    data.earnings.forEach((el, i) => {
        const period = el.period / 3600;
        if (i > 0) {
        earningPeriod[i].textContent = period > 24 ? `${period / 24} d` : `${period} h`;
        earningBlocks[i].textContent = el.blocks;
        earningAmount[i].textContent = (el.amount / 1000000000).toFixed(0);
        earningLuck[i].textContent = el.luck;
        if(el.luck > 100) earningLuck[i].classList.add('high');
           else{ earningLuck[i].classList.add('high') }
        }
       });
    
    if(data.rewards){
    if (!data.rewards[0].matured) {
        rewardsBlock.classList.remove('payout')
        tx.href = null;
        tx.textContent = null;
        rewardsHeight.textContent = data.rewards[0].height;
        rewardsAmount.textContent = data.rewards[0].amount / 1000000000;
        rewardsTimeStamp = new Date (data.rewards[0].timestamp * 1000);
        rewardsDate.textContent = rewardsTimeStamp.toLocaleString([], {month:'2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'});
      } else {
        rewardsBlock.classList.add('payout');
        tx.href = 'https://explorer.btcz.rocks/tx/'+data.payments[0].tx;
        tx.target = '_blank';
        tx.textContent = 'Last tx';
        rewardsAmount.textContent = data.payments[0].amount / 1000000000;
        rewardsTimeStamp = new Date (data.payments[0].timestamp * 1000);
        rewardsDate.textContent = rewardsTimeStamp.toLocaleString([], {month:'2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'});
      } 
    }
    }

	const res2 = await fetch(tentUrl);
    const data2 = await res2.json();
    console.log(data2)

    if (!data2) {
        hashrateCurrent2.textContent = "Sorry, pool is down";
        hashrate2.textContent = ' :-( ';
    } else if (data2.workers) {
    const dateNow = new Date();
    hashrateCurrent2.textContent = `${ data2.currentHashrate }`;
    hashrate2.textContent = `(${ data2.hashrate })`;
    const lastShareDate = new Date(data2.stats.lastShare * 1000);
    const TimeDelta = (dateNow - lastShareDate) / 1000;
    const TimeLast = TimeDelta > 60 ? `${(TimeDelta / 60).toFixed(0)}m` : `${TimeDelta.toFixed(0)}s`;
    const lastShareMin = TimeDelta > 600 ? lastShareDate.toLocaleTimeString() : TimeLast;
    lastShare2.textContent = `${ lastShareMin }`;
        if (data2.workers.nv4.offline || data2.workers.nv4.dead) hashrateBlock2.classList.add('offline');
            else {hashrateBlock2.classList.remove('offline')}
    data2.earnings.forEach((el, i) => {
        const period = el.period / 3600;
        if (i > 0) {
        earningPeriod2[i].textContent = period > 24 ? `${period / 24} d` : `${period} h`;
        earningBlocks2[i].textContent = el.blocks;
        earningAmount2[i].textContent = (el.amount / 1000000000).toFixed(0);
        earningLuck2[i].textContent = el.luck;
        if(el.luck > 100) earningLuck2[i].classList.add('high');
           else{ earningLuck2[i].classList.add('high') }
        }
       });

    if(data2.rewards){
        if(!data2.rewards[0].matured) {
            rewardsBlock2.classList.remove('payout')
            tx2.href = null;
            tx2.textContent = null;
            rewardsHeight2.textContent = data2.rewards[0].height;
            rewardsAmount2.textContent = data2.rewards[0].amount / 1000000000;
            rewardsTimeStamp2 = new Date (data2.rewards[0].timestamp * 1000);
            rewardsDate2.textContent = rewardsTimeStamp2.toLocaleString([], {month:'2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'});
        } else {
            rewardsBlock2.classList.add('payout');
            tx2.href = 'https://explorer.btcz.rocks/tx/' + data2.payments[0].tx;
            tx2.target = '_blank';
            tx2.textContent = 'Last tx';
            rewardsAmount2.textContent = data2.payments[0].amount / 1000000000;
            rewardsTimeStamp2 = new Date (data2.payments[0].timestamp * 1000);
            rewardsDate2.textContent = rewardsTimeStamp2.toLocaleString([], {month:'2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'});
      } 
    }   
    }

}