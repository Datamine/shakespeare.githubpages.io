// This will store the selected option globally
window.selectedOption = null;

// Sample data - replace this with your actual data
const options = [
  {"name": "A Midsummer Night's Dream", "filename": "a-midsummer-nights-dream"},
  {"name": "All's Well That Ends Well", "filename": "alls-well-that-ends-well"},
  {"name": "Antony and Cleopatra", "filename": "antony-and-cleopatra"},
  {"name": "As You Like It", "filename": "as-you-like-it"},
  {"name": "Coriolanus", "filename": "coriolanus"},
  {"name": "Cymbeline", "filename": "cymbeline"},
  {"name": "Hamlet", "filename": "hamlet"},
  {"name": "Henry IV, Part 1", "filename": "henry-iv-part-1"},
  {"name": "Henry IV, Part 2", "filename": "henry-iv-part-2"},
  {"name": "Henry V", "filename": "henry-v"},
  {"name": "Henry VI, Part 1", "filename": "henry-vi-part-1"},
  {"name": "Henry VI, Part 2", "filename": "henry-vi-part-2"},
  {"name": "Henry VI, Part 3", "filename": "henry-vi-part-3"},
  {"name": "Henry VIII", "filename": "henry-viii"},
  {"name": "Julius Caesar", "filename": "julius-caesar"},
  {"name": "King John", "filename": "king-john"},
  {"name": "King Lear", "filename": "king-lear"},
  {"name": "Love's Labor's Lost", "filename": "loves-labors-lost"},
  {"name": "The Rape of Lucrece", "filename": "lucrece"},
  {"name": "Macbeth", "filename": "macbeth"},
  {"name": "Measure for Measure", "filename": "measure-for-measure"},
  {"name": "Much Ado About Nothing", "filename": "much-ado-about-nothing"},
  {"name": "Othello", "filename": "othello"},
  {"name": "Pericles", "filename": "pericles"},
  {"name": "Richard II", "filename": "richard-ii"},
  {"name": "Richard III", "filename": "richard-iii"},
  {"name": "Romeo and Juliet", "filename": "romeo-and-juliet"},
  {"name": "Shakespeare's Sonnets", "filename": "shakespeares-sonnets"},
  {"name": "The Comedy of Errors", "filename": "the-comedy-of-errors"},
  {"name": "The Merchant of Venice", "filename": "the-merchant-of-venice"},
  {"name": "The Merry Wives of Windsor", "filename": "the-merry-wives-of-windsor"},
  {"name": "The Phoenix and Turtle", "filename": "the-phoenix-and-turtle"},
  {"name": "The Taming of the Shrew", "filename": "the-taming-of-the-shrew"},
  {"name": "The Tempest", "filename": "the-tempest"},
  {"name": "The Two Gentlemen of Verona", "filename": "the-two-gentlemen-of-verona"},
  {"name": "The Two Noble Kinsmen", "filename": "the-two-noble-kinsmen"},
  {"name": "The Winter's Tale", "filename": "the-winters-tale"},
  {"name": "Timon of Athens", "filename": "timon-of-athens"},
  {"name": "Titus Andronicus", "filename": "titus-andronicus"},
  {"name": "Troilus and Cressida", "filename": "troilus-and-cressida"},
  {"name": "Twelfth Night", "filename": "twelfth-night"},
  {"name": "Venus and Adonis", "filename": "venus-and-adonis"}
]

const input = document.getElementById('typeahead-input');
const suggestionsList = document.getElementById('suggestions-list');
let selectedIndex = -1;

// Hide suggestions list initially
suggestionsList.classList.add('hidden');

const searchOptions = _.debounce((searchText) => {
    const filteredOptions = searchText 
        ? options.filter(option => 
            option.name.toLowerCase().includes(searchText.toLowerCase()))
        : options; // Show first 10 options when no search text
    
    updateSuggestions(filteredOptions);
    selectedIndex = -1;
}, 50);

function updateSuggestions(filteredOptions) {
    suggestionsList.innerHTML = '';
    
    if (filteredOptions.length > 0) {
        filteredOptions.forEach((option, index) => {
            const li = document.createElement('li');
            li.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer';
            li.textContent = option.name;
            li.setAttribute('data-index', index);
            li.onclick = () => selectOption(option);
            suggestionsList.appendChild(li);
        });
        suggestionsList.classList.remove('hidden');
    } else {
        suggestionsList.classList.add('hidden');
    }
}

const goButton = document.getElementById('go-button');

function selectOption(option) {
    input.value = option.name;
    suggestionsList.classList.add('hidden');
    selectedIndex = -1;
    // Enable and style the Go button
    goButton.classList.add('active');
    goButton.disabled = false;
    console.log('Selected:', option);
}

// Reset button when input changes
input.addEventListener('input', (e) => {
    goButton.classList.remove('active');
    goButton.disabled = true;
    searchOptions(e.target.value);
});

// Add click handler for the Go button
goButton.addEventListener('click', async () => {
    if (!goButton.disabled) {
        goButton.classList.add('loading');
        
        // Get the selected play name and filename
        const selectedPlay = input.value;
        const playFile = options.find(opt => opt.name === selectedPlay)?.filename;
    
        // Dynamically import the selected play
        // LOCAL DEV ONLY const playModule = await import(`/plays/${playFile}.js`);
        // const playText = "Lorem Ipsum"; // playModule.text;
        const rawPlayText = `Characters in the Play
<hr>
HELEN, a gentlewoman of Rossillion
BERTRAM, Count of Rossillion
COUNTESS of Rossillion, Bertram's mother
In the Countess's household:
STEWARD
FOOL
PAGE
PAROLLES, companion to Bertram
KING of France
LAFEW, a French lord
Later Captains in the army of the Duke of Florence:
FIRST LORD
SECOND LORD
Other LORDS in the court of the King of France
From the court of the King of France:
FIRST GENTLEMAN
SECOND GENTLEMAN
GENTLEMAN, a "gentle Astringer"
FIRST SOLDIER, interpreter
The DUKE of Florence
A WIDOW of Florence
DIANA, the Widow's daughter
MARIANA, the Widow's neighbor
Attendants, Soldiers, Citizens of Florence, Servants

<b id="act-1" class="act-header">Act 1</b>
<b id="act-1-scene-1" class="scene-header">Scene 1</b>
<hr>
[<i>Enter young Bertram Count of Rossillion, his mother
the Countess, and Helen, Lord Lafew, all in black.</i>]

<speaker>COUNTESS</speaker>
In delivering my son from me, I bury a second
husband.

<speaker>BERTRAM</speaker>
And I in going, madam, weep o'er my
father's death anew; but I must attend his Majesty's
command, to whom I am now in ward, evermore
in subjection.

<speaker>LAFEW</speaker>
You shall find of the King a husband, madam;
you, sir, a father. He that so generally is at all times
good must of necessity hold his virtue to you,
whose worthiness would stir it up where it wanted
rather than lack it where there is such abundance.

<speaker>COUNTESS</speaker>
What hope is there of his Majesty's
amendment?

<speaker>LAFEW</speaker>
He hath abandoned his physicians, madam,
under whose practices he hath persecuted time
with hope, and finds no other advantage in the
process but only the losing of hope by time.

<speaker>COUNTESS</speaker>
This young gentlewoman had a father--O,
that "had," how sad a passage 'tis!--whose skill
was almost as great as his honesty; had it stretched
so far, would have made nature immortal, and
death should have play for lack of work. Would for
the King's sake he were living! I think it would be
the death of the King's disease.

<speaker>LAFEW</speaker>
How called you the man you speak of,
madam?

<speaker>COUNTESS</speaker>
He was famous, sir, in his profession, and it
was his great right to be so: Gerard de Narbon.

<speaker>LAFEW</speaker>
He was excellent indeed, madam. The King
very lately spoke of him admiringly, and mourningly.
He was skillful enough to have lived still, if
knowledge could be set up against mortality.

<speaker>BERTRAM</speaker>
What is it, my good lord, the King languishes
of?

<speaker>LAFEW</speaker>
A fistula, my lord.

<speaker>BERTRAM</speaker>
I heard not of it before.

<speaker>LAFEW</speaker>
I would it were not notorious.--Was this gentlewoman
the daughter of Gerard de Narbon?

<speaker>COUNTESS</speaker>
His sole child, my lord, and bequeathed to
my overlooking. I have those hopes of her good
that her education promises. Her dispositions she
inherits, which makes fair gifts fairer; for where an
unclean mind carries virtuous qualities, there
commendations go with pity--they are virtues and
traitors too. In her they are the better for their simpleness.
She derives her honesty and achieves her
goodness.

<speaker>LAFEW</speaker>
Your commendations, madam, get from her
tears.

<speaker>COUNTESS</speaker>
'Tis the best brine a maiden can season her
praise in. The remembrance of her father never
approaches her heart but the tyranny of her sorrows
takes all livelihood from her cheek.--No
more of this, Helena. Go to. No more, lest it be
rather thought you affect a sorrow than to have--

<speaker>HELEN</speaker>
I do affect a sorrow indeed, but I have it too.

<speaker>LAFEW</speaker>
Moderate lamentation is the right of the dead,
excessive grief the enemy to the living.

<speaker>COUNTESS</speaker>
If the living be enemy to the grief, the
excess makes it soon mortal.

<speaker>BERTRAM</speaker>
Madam, I desire your holy wishes.

<speaker>LAFEW</speaker>
How understand we that?

<speaker>COUNTESS</speaker>
Be thou blessed, Bertram, and succeed thy father
In manners as in shape. Thy blood and virtue
Contend for empire in thee, and thy goodness
Share with thy birthright. Love all, trust a few,
Do wrong to none. Be able for thine enemy
Rather in power than use, and keep thy friend
Under thy own life's key Be checked for silence,
But never taxed for speech. What heaven more will,
That thee may furnish and my prayers pluck down,
Fall on thy head. [<i>To Lafew.</i>]
Farewell, my lord.
'Tis an unseasoned courtier. Good my lord,
Advise him.

<speaker>LAFEW</speaker>
He cannot want the best that shall
Attend his love.

<speaker>COUNTESS</speaker>
Heaven bless him.--Farewell, Bertram.

<speaker>BERTRAM</speaker>
The best wishes that can be forged in your
thoughts be servants to you.	[<i>Countess exits.</i>]
[<i>To Helen.</i>]
Be comfortable to my mother, your
mistress, and make much of her.

<speaker>LAFEW</speaker>
Farewell, pretty lady. You must hold the credit
of your father. 	[<i>Bertram and Lafew exit.</i>]

<speaker>HELEN</speaker>
O, were that all! I think not on my father,
And these great tears grace his remembrance more
Than those I shed for him. What was he like?
I have forgot him. My imagination
Carries no favor in 't but Bertram's.
I am undone. There is no living, none,
If Bertram be away. 'Twere all one
That I should love a bright particular star
And think to wed it, he is so above me.
In his bright radiance and collateral light
Must I be comforted, not in his sphere.
Th' ambition in my love thus plagues itself:
The hind that would be mated by the lion
Must die for love. 'Twas pretty, though a plague,
To see him every hour, to sit and draw
His arched brows, his hawking eye, his curls
In our heart's table--heart too capable
Of every line and trick of his sweet favor.
But now he's gone, and my idolatrous fancy
Must sanctify his relics. Who comes here?

[<i>Enter Parolles.</i>]

One that goes with him. I love him for his sake,
And yet I know him a notorious liar,
Think him a great way fool, solely a coward.
Yet these fixed evils sit so fit in him
That they take place when virtue's steely bones
Looks bleak i' th' cold wind. Withal, full oft we see
Cold wisdom waiting on superfluous folly.

<speaker>PAROLLES</speaker>
Save you, fair queen.

<speaker>HELEN</speaker>
And you, monarch.

<speaker>PAROLLES</speaker>
No.

<speaker>HELEN</speaker>
And no.

<speaker>PAROLLES</speaker>
Are you meditating on virginity?

<speaker>HELEN</speaker>
Ay. You have some stain of soldier in you; let
me ask you a question. Man is enemy to virginity.
How may we barricado it against him?

<speaker>PAROLLES</speaker>
Keep him out.

<speaker>HELEN</speaker>
But he assails, and our virginity, though
valiant in the defense, yet is weak. Unfold to us
some warlike resistance.

<speaker>PAROLLES</speaker>
There is none. Man setting down before you
will undermine you and blow you up.

<speaker>HELEN</speaker>
Bless our poor virginity from underminers and
blowers-up! Is there no military policy how virgins
might blow up men?

<speaker>PAROLLES</speaker>
Virginity being blown down, man will
quicklier be blown up. Marry, in blowing him
down again, with the breach yourselves made you
lose your city. It is not politic in the commonwealth
of nature to preserve virginity. Loss of virginity
is rational increase, and there was never
virgin got till virginity was first lost. That you
were made of is metal to make virgins. Virginity by
being once lost may be ten times found; by being
ever kept, it is ever lost. 'Tis too cold a companion.
Away with 't.

<speaker>HELEN</speaker>
I will stand for 't a little, though therefore I
die a virgin.

<speaker>PAROLLES</speaker>
There's little can be said in 't. 'Tis against the
rule of nature. To speak on the part of virginity is
to accuse your mothers, which is most infallible
disobedience. He that hangs himself is a virgin;
virginity murders itself and should be buried in
highways out of all sanctified limit as a desperate
offendress against nature. Virginity breeds mites,
much like a cheese, consumes itself to the very
paring, and so dies with feeding his own stomach.
Besides, virginity is peevish, proud, idle, made of
self-love, which is the most inhibited sin in the
canon. Keep it not; you cannot choose but lose by
't. Out with 't! Within ten year it will make itself
two, which is a goodly increase, and the principal
itself not much the worse. Away with 't!

<speaker>HELEN</speaker>
How might one do, sir, to lose it to her own
liking?

<speaker>PAROLLES</speaker>
Let me see. Marry, ill, to like him that ne'er
it likes. 'Tis a commodity will lose the gloss with
lying; the longer kept, the less worth. Off with 't
while 'tis vendible; answer the time of request. Virginity,
like an old courtier, wears her cap out of
fashion, richly suited but unsuitable, just like the
brooch and the toothpick, which wear not now.
Your date is better in your pie and your porridge
than in your cheek. And your virginity, your old
virginity, is like one of our French withered pears:
it looks ill, it eats dryly; marry, 'tis a withered pear.
It was formerly better, marry, yet 'tis a withered
pear. Will you anything with it?

<speaker>HELEN</speaker>
Not my virginity, yet--
There shall your master have a thousand loves,
A mother, and a mistress, and a friend,
A phoenix, captain, and an enemy,
A guide, a goddess, and a sovereign,
A counselor, a traitress, and a dear;
His humble ambition, proud humility,
His jarring concord, and his discord dulcet,
His faith, his sweet disaster, with a world
Of pretty, fond adoptious christendoms
That blinking Cupid gossips. Now shall he--
I know not what he shall. God send him well.
The court's a learning place, and he is one--

<speaker>PAROLLES</speaker>
What one, i' faith?

<speaker>HELEN</speaker>
That I wish well. 'Tis pity--

<speaker>PAROLLES</speaker>
What's pity?

<speaker>HELEN</speaker>
That wishing well had not a body in 't
Which might be felt, that we, the poorer born,
Whose baser stars do shut us up in wishes,
Might with effects of them follow our friends
And show what we alone must think, which never
Returns us thanks.

[<i>Enter Page.</i>]

<speaker>PAGE</speaker>
Monsieur Parolles, my lord calls for you.

<speaker>PAROLLES</speaker>
Little Helen, farewell. If I can remember
thee, I will think of thee at court.

<speaker>HELEN</speaker>
Monsieur Parolles, you were born under a
charitable star.

<speaker>PAROLLES</speaker>
Under Mars, I.

<speaker>HELEN</speaker>
I especially think under Mars.

<speaker>PAROLLES</speaker>
Why under Mars?

<speaker>HELEN</speaker>
The wars hath so kept you under that you
must needs be born under Mars.

<speaker>PAROLLES</speaker>
When he was predominant.

<speaker>HELEN</speaker>
When he was retrograde, I think rather.

<speaker>PAROLLES</speaker>
Why think you so?

<speaker>HELEN</speaker>
You go so much backward when you fight.

<speaker>PAROLLES</speaker>
That's for advantage.

<speaker>HELEN</speaker>
So is running away, when fear proposes the
safety. But the composition that your valor and
fear makes in you is a virtue of a good wing, and I
like the wear well.

<speaker>PAROLLES</speaker>
I am so full of businesses I cannot answer
thee acutely. I will return perfect courtier, in the
which my instruction shall serve to naturalize
thee, so thou wilt be capable of a courtier's counsel
and understand what advice shall thrust upon
thee, else thou diest in thine unthankfulness, and
thine ignorance makes thee away. Farewell. When
thou hast leisure, say thy prayers; when thou hast
none, remember thy friends. Get thee a good husband,
and use him as he uses thee. So, farewell.
[<i>Parolles and Page exit.</i>]

<speaker>HELEN</speaker>
Our remedies oft in ourselves do lie
Which we ascribe to heaven. The fated sky
Gives us free scope, only doth backward pull
Our slow designs when we ourselves are dull.
What power is it which mounts my love so high,
That makes me see, and cannot feed mine eye?
The mightiest space in fortune nature brings
To join like likes and kiss like native things.
Impossible be strange attempts to those
That weigh their pains in sense and do suppose
What hath been cannot be. Who ever strove
To show her merit that did miss her love?
The King's disease--my project may deceive me,
But my intents are fixed and will not leave me.
[<i>She exits.</i>]

<b id="act-1-scene-2" class="scene-header">Scene 2</b>
<hr>
[<i>Flourish cornets. Enter the King of France with letters,
two Lords, and divers Attendants.</i>]

<speaker>KING</speaker>
The Florentines and Senoys are by th' ears,
Have fought with equal fortune, and continue
A braving war.

<speaker>FIRST LORD</speaker>
So 'tis reported, sir.

<speaker>KING</speaker>
Nay, 'tis most credible. We here receive it
A certainty vouched from our cousin Austria,
With caution that the Florentine will move us
For speedy aid, wherein our dearest friend
Prejudicates the business and would seem
To have us make denial.

<speaker>FIRST LORD</speaker>
His love and wisdom,
Approved so to your Majesty, may plead
For amplest credence.

<speaker>KING</speaker>
He hath armed our answer,
And Florence is denied before he comes.
Yet for our gentlemen that mean to see
The Tuscan service, freely have they leave
To stand on either part.

<speaker>SECOND LORD</speaker>
It well may serve
A nursery to our gentry, who are sick
For breathing and exploit.

[<i>Enter Bertram, Lafew, and Parolles.</i>]

<speaker>KING</speaker>
What's he comes here?

<speaker>FIRST LORD</speaker>
It is the Count Rossillion, my good lord,
Young Bertram.

<speaker>KING</speaker>
Youth, thou bear'st thy father's face.
Frank nature, rather curious than in haste,
Hath well composed thee. Thy father's moral parts
Mayst thou inherit too. Welcome to Paris.

<speaker>BERTRAM</speaker>
My thanks and duty are your Majesty's.

<speaker>KING</speaker>
I would I had that corporal soundness now
As when thy father and myself in friendship
First tried our soldiership. He did look far
Into the service of the time and was
Discipled of the bravest. He lasted long,
But on us both did haggish age steal on
And wore us out of act. It much repairs me
To talk of your good father. In his youth
He had the wit which I can well observe
Today in our young lords; but they may jest
Till their own scorn return to them unnoted
Ere they can hide their levity in honor.
So like a courtier, contempt nor bitterness
Were in his pride or sharpness; if they were,
His equal had awaked them, and his honor,
Clock to itself, knew the true minute when
Exception bid him speak, and at this time
His tongue obeyed his hand. Who were below him
He used as creatures of another place
And bowed his eminent top to their low ranks,
Making them proud of his humility,
In their poor praise he humbled. Such a man
Might be a copy to these younger times,
Which, followed well, would demonstrate them now
But goers backward.

<speaker>BERTRAM</speaker>
His good remembrance, sir,
Lies richer in your thoughts than on his tomb.
So in approof lives not his epitaph
As in your royal speech.

<speaker>KING</speaker>
Would I were with him! He would always say--
Methinks I hear him now; his plausive words
He scattered not in ears, but grafted them
To grow there and to bear. "Let me not live"--
This his good melancholy oft began
On the catastrophe and heel of pastime,
When it was out--"Let me not live," quoth he,
"After my flame lacks oil, to be the snuff
Of younger spirits, whose apprehensive senses
All but new things disdain, whose judgments are
Mere fathers of their garments, whose constancies
Expire before their fashions." This he wished.
I, after him, do after him wish too,
Since I nor wax nor honey can bring home,
I quickly were dissolved from my hive
To give some laborers room.

<speaker>SECOND LORD</speaker>
You're loved, sir.
They that least lend it you shall lack you first.

<speaker>KING</speaker>
I fill a place, I know 't.--How long is 't, count,
Since the physician at your father's died?
He was much famed.

<speaker>BERTRAM</speaker>
Some six months since, my lord.

<speaker>KING</speaker>
If he were living, I would try him yet.--
Lend me an arm.--The rest have worn me out
With several applications. Nature and sickness
Debate it at their leisure. Welcome, count.
My son's no dearer.

<speaker>BERTRAM</speaker>
Thank your Majesty.
[<i>They exit. Flourish.</i>]

<b id="act-1-scene-3" class="scene-header">Scene 3</b>
<hr>
[<i>Enter Countess, Steward, and Fool.</i>]

<speaker>COUNTESS</speaker>
I will now hear. What say you of this
gentlewoman?

<speaker>STEWARD</speaker>
Madam, the care I have had to even your
content I wish might be found in the calendar of
my past endeavors, for then we wound our modesty
and make foul the clearness of our deservings
when of ourselves we publish them.

<speaker>COUNTESS</speaker>
What does this knave here? [<i>To Fool.</i>]
Get
you gone, sirrah. The complaints I have heard of
you I do not all believe. 'Tis my slowness that I do
not, for I know you lack not folly to commit them
and have ability enough to make such knaveries
yours.

<speaker>FOOL</speaker>
'Tis not unknown to you, madam, I am a poor
fellow.

<speaker>COUNTESS</speaker>
Well, sir.

<speaker>FOOL</speaker>
No, madam, 'tis not so well that I am poor,
though many of the rich are damned. But if I may
have your Ladyship's good will to go to the world,
Isbel the woman and I will do as we may.

<speaker>COUNTESS</speaker>
Wilt thou needs be a beggar?

<speaker>FOOL</speaker>
I do beg your good will in this case.

<speaker>COUNTESS</speaker>
In what case?

<speaker>FOOL</speaker>
In Isbel's case and mine own. Service is no heritage,
and I think I shall never have the blessing of
God till I have issue o' my body, for they say bairns
are blessings.

<speaker>COUNTESS</speaker>
Tell me thy reason why thou wilt marry.

<speaker>FOOL</speaker>
My poor body, madam, requires it. I am driven
on by the flesh, and he must needs go that the devil
drives.

<speaker>COUNTESS</speaker>
Is this all your Worship's reason?

<speaker>FOOL</speaker>
Faith, madam, I have other holy reasons, such
as they are.

<speaker>COUNTESS</speaker>
May the world know them?

<speaker>FOOL</speaker>
I have been, madam, a wicked creature, as you
and all flesh and blood are, and indeed I do marry
that I may repent.

<speaker>COUNTESS</speaker>
Thy marriage sooner than thy wickedness.

<speaker>FOOL</speaker>
I am out o' friends, madam, and I hope to have
friends for my wife's sake.

<speaker>COUNTESS</speaker>
Such friends are thine enemies, knave.

<speaker>FOOL</speaker>
You're shallow, madam, in great friends, for the
knaves come to do that for me which I am aweary
of. He that ears my land spares my team and gives
me leave to in the crop; if I be his cuckold, he's my
drudge. He that comforts my wife is the cherisher
of my flesh and blood; he that cherishes my flesh
and blood loves my flesh and blood; he that loves
my flesh and blood is my friend. Ergo, he that
kisses my wife is my friend. If men could be contented
to be what they are, there were no fear in
marriage, for young Charbon the Puritan and old
Poysam the Papist, howsome'er their hearts are
severed in religion, their heads are both one; they
may jowl horns together like any deer i' th' herd.

<speaker>COUNTESS</speaker>
Wilt thou ever be a foul-mouthed and
calumnious knave?

<speaker>FOOL</speaker>
A prophet I, madam, and I speak the truth the
next way:
[<i>Sings.</i>]
For I the ballad will repeat
Which men full true shall find:
Your marriage comes by destiny;
Your cuckoo sings by kind.

<speaker>COUNTESS</speaker>
Get you gone, sir. I'll talk with you more
anon.

<speaker>STEWARD</speaker>
May it please you, madam, that he bid Helen
come to you. Of her I am to speak.

<speaker>COUNTESS</speaker>
Sirrah, tell my gentlewoman I would speak
with her--Helen, I mean.

<speaker>FOOL</speaker>
[<i>sings</i>]
"Was this fair face the cause," quoth she,
"Why the Grecians sacked Troy?
Fond done, done fond.
Was this King Priam's joy?"
With that she sighed as she stood,
With that she sighed as she stood,
And gave this sentence then:
"Among nine bad if one be good,
Among nine bad if one be good,
There's yet one good in ten."

<speaker>COUNTESS</speaker>
What, one good in ten? You corrupt the
song, sirrah.

<speaker>FOOL</speaker>
One good woman in ten, madam, which is a
purifying o' th' song. Would God would serve the
world so all the year! We'd find no fault with the
tithe-woman if I were the parson. One in ten,
quoth he? An we might have a good woman born
but or every blazing star or at an earthquake,
'twould mend the lottery well. A man may draw his
heart out ere he pluck one.

<speaker>COUNTESS</speaker>
You'll be gone, sir knave, and do as I command
you!

<speaker>FOOL</speaker>
That man should be at woman's command, and
yet no hurt done! Though honesty be no Puritan,
yet it will do no hurt; it will wear the surplice of
humility over the black gown of a big heart. I am
going, forsooth. The business is for Helen to come
hither.	[<i>He exits.</i>]

<speaker>COUNTESS</speaker>
Well, now.

<speaker>STEWARD</speaker>
I know, madam, you love your gentlewoman
entirely.

<speaker>COUNTESS</speaker>
Faith, I do. Her father bequeathed her to
me, and she herself, without other advantage, may
lawfully make title to as much love as she finds.
There is more owing her than is paid, and more
shall be paid her than she'll demand.

<speaker>STEWARD</speaker>
Madam, I was very late more near her than I
think she wished me. Alone she was and did communicate
to herself her own words to her own
ears; she thought, I dare vow for her, they touched
not any stranger sense. Her matter was she loved
your son. Fortune, she said, was no goddess, that
had put such difference betwixt their two estates;
Love no god, that would not extend his might only
where qualities were level; Dian no queen of virgins,
that would suffer her poor knight surprised
without rescue in the first assault or ransom afterward.
This she delivered in the most bitter touch
of sorrow that e'er I heard virgin exclaim in, which
I held my duty speedily to acquaint you withal,
sithence in the loss that may happen it concerns
you something to know it.

<speaker>COUNTESS</speaker>
You have discharged this honestly. Keep it
to yourself. Many likelihoods informed me of this
before, which hung so tott'ring in the balance that
I could neither believe nor misdoubt. Pray you
leave me. Stall this in your bosom, and I thank you
for your honest care. I will speak with you further
anon.	[<i>Steward exits.</i>]

[<i>Enter Helen.</i>]

[<i>Aside.</i>]
Even so it was with me when I was young.
If ever we are nature's, these are ours. This thorn
Doth to our rose of youth rightly belong.
Our blood to us, this to our blood is born.
It is the show and seal of nature's truth,
Where love's strong passion is impressed in youth.
By our remembrances of days foregone,
Such were our faults, or then we thought them none.
Her eye is sick on 't, I observe her now.

<speaker>HELEN</speaker>
What is your pleasure, madam?

<speaker>COUNTESS</speaker>
You know, Helen, I am a mother to you.

<speaker>HELEN</speaker>
Mine honorable mistress.

<speaker>COUNTESS</speaker>
Nay, a mother.
Why not a mother? When I said "a mother,"
Methought you saw a serpent. What's in "mother"
That you start at it? I say I am your mother
And put you in the catalogue of those
That were enwombed mine. 'Tis often seen
Adoption strives with nature, and choice breeds
A native slip to us from foreign seeds.
You ne'er oppressed me with a mother's groan,
Yet I express to you a mother's care.
God's mercy, maiden, does it curd thy blood
To say I am thy mother? What's the matter,
That this distempered messenger of wet,
The many-colored Iris, rounds thine eye?
Why? That you are my daughter?

<speaker>HELEN</speaker>
That I am not.

<speaker>COUNTESS</speaker>
I say I am your mother.

<speaker>HELEN</speaker>
Pardon, madam.
The Count Rossillion cannot be my brother.
I am from humble, he from honored name;
No note upon my parents, his all noble.
My master, my dear lord he is, and I
His servant live and will his vassal die.
He must not be my brother.

<speaker>COUNTESS</speaker>
Nor I your mother?

<speaker>HELEN</speaker>
You are my mother, madam. Would you were--
So that my lord your son were not my brother--
Indeed my mother! Or were you both our mothers,
I care no more for than I do for heaven,
So I were not his sister. Can 't no other
But, I your daughter, he must be my brother?

<speaker>COUNTESS</speaker>
Yes, Helen, you might be my daughter-in-law.
God shield you mean it not! "Daughter" and "mother"
So strive upon your pulse. What, pale again?
My fear hath catched your fondness! Now I see
The mystery of your loneliness and find
Your salt tears' head. Now to all sense 'tis gross:
You love my son. Invention is ashamed
Against the proclamation of thy passion
To say thou dost not. Therefore tell me true,
But tell me then 'tis so, for, look, thy cheeks
Confess it th' one to th' other, and thine eyes
See it so grossly shown in thy behaviors
That in their kind they speak it. Only sin
And hellish obstinacy tie thy tongue
That truth should be suspected. Speak. Is 't so?
If it be so, you have wound a goodly clew;
If it be not, forswear 't; howe'er, I charge thee,
As heaven shall work in me for thine avail,
To tell me truly.

<speaker>HELEN</speaker>
Good madam, pardon me.

<speaker>COUNTESS</speaker>
Do you love my son?

<speaker>HELEN</speaker>
Your pardon, noble mistress.

<speaker>COUNTESS</speaker>
Love you my son?

<speaker>HELEN</speaker>
Do not you love him, madam?

<speaker>COUNTESS</speaker>
Go not about. My love hath in 't a bond
Whereof the world takes note. Come, come, disclose
The state of your affection, for your passions
Have to the full appeached.

<speaker>HELEN,</speaker>
[<i>kneeling</i>]
Then I confess
Here on my knee before high heaven and you
That before you and next unto high heaven
I love your son.
My friends were poor but honest; so 's my love.
Be not offended, for it hurts not him
That he is loved of me. I follow him not
By any token of presumptuous suit,
Nor would I have him till I do deserve him,
Yet never know how that desert should be.
I know I love in vain, strive against hope,
Yet in this captious and intenible sieve
I still pour in the waters of my love
And lack not to lose still. Thus, Indian-like,
Religious in mine error, I adore
The sun that looks upon his worshipper
But knows of him no more. My dearest madam,
Let not your hate encounter with my love
For loving where you do; but if yourself,
Whose aged honor cites a virtuous youth,
Did ever in so true a flame of liking
Wish chastely and love dearly, that your Dian
Was both herself and Love, O then give pity
To her whose state is such that cannot choose
But lend and give where she is sure to lose;
That seeks not to find that her search implies,
But riddle-like lives sweetly where she dies.

<speaker>COUNTESS</speaker>
Had you not lately an intent--speak truly--
To go to Paris?

<speaker>HELEN</speaker>
Madam, I had.

<speaker>COUNTESS</speaker>
Wherefore?
Tell true.

<speaker>HELEN,</speaker>
[<i>standing</i>]
I will tell truth, by grace itself I swear.
You know my father left me some prescriptions
Of rare and proved effects, such as his reading
And manifest experience had collected
For general sovereignty; and that he willed me
In heedfull'st reservation to bestow them
As notes whose faculties inclusive were
More than they were in note. Amongst the rest
There is a remedy, approved, set down,
To cure the desperate languishings whereof
The King is rendered lost.

<speaker>COUNTESS</speaker>
This was your motive for Paris, was it? Speak.

<speaker>HELEN</speaker>
My lord your son made me to think of this;
Else Paris, and the medicine, and the King
Had from the conversation of my thoughts
Haply been absent then.

<speaker>COUNTESS</speaker>
But think you, Helen,
If you should tender your supposed aid,
He would receive it? He and his physicians
Are of a mind: he that they cannot help him,
They that they cannot help. How shall they credit
A poor unlearned virgin, when the schools
Emboweled of their doctrine have left off
The danger to itself?

<speaker>HELEN</speaker>
There's something in 't
More than my father's skill, which was the great'st
Of his profession, that his good receipt
Shall for my legacy be sanctified
By th' luckiest stars in heaven; and would your
Honor
But give me leave to try success, I'd venture
The well-lost life of mine on his Grace's cure
By such a day, an hour.

<speaker>COUNTESS</speaker>
Dost thou believe 't?

<speaker>HELEN</speaker>
Ay, madam, knowingly.

<speaker>COUNTESS</speaker>
Why, Helen, thou shalt have my leave and love,
Means and attendants, and my loving greetings
To those of mine in court. I'll stay at home
And pray God's blessing into thy attempt.
Be gone tomorrow, and be sure of this:
What I can help thee to thou shalt not miss.
[<i>They exit.</i>]

<b id="act-2" class="act-header">Act 2</b>
<b id="act-2-scene-1" class="scene-header">Scene 1</b>
<hr>
[<i>Flourish cornets. Enter the King, attended, with divers
young Lords, taking leave for the Florentine war;
Bertram Count Rossillion, and Parolles.</i>]

<speaker>KING</speaker>
Farewell, young lords. These warlike principles
Do not throw from you.--And you, my lords,
farewell.
Share the advice betwixt you. If both gain all,
The gift doth stretch itself as 'tis received
And is enough for both.

<speaker>FIRST LORD</speaker>
'Tis our hope, sir,
After well-entered soldiers, to return
And find your Grace in health.

<speaker>KING</speaker>
No, no, it cannot be. And yet my heart
Will not confess he owes the malady
That doth my life besiege. Farewell, young lords.
Whether I live or die, be you the sons
Of worthy Frenchmen. Let higher Italy--
Those bated that inherit but the fall
Of the last monarchy--see that you come
Not to woo honor but to wed it. When
The bravest questant shrinks, find what you seek,
That fame may cry you loud. I say farewell.

<speaker>FIRST LORD</speaker>
Health at your bidding serve your Majesty!

<speaker>KING</speaker>
Those girls of Italy, take heed of them.
They say our French lack language to deny
If they demand. Beware of being captives
Before you serve.

<speaker>LORDS</speaker>
Our hearts receive your warnings.

<speaker>KING</speaker>
Farewell.--Come hither to me.
[<i>The King speaks to Attendants, while Bertram,
Parolles, and other Lords come forward.</i>]

<speaker>FIRST LORD,</speaker>
[<i>to Bertram</i>]
O my sweet lord, that you will stay behind us!

<speaker>PAROLLES</speaker>
'Tis not his fault, the spark.

<speaker>SECOND LORD</speaker>
O, 'tis brave wars.

<speaker>PAROLLES</speaker>
Most admirable. I have seen those wars.

<speaker>BERTRAM</speaker>
I am commanded here and kept a coil
With "Too young," and "The next year," and "'Tis
too early."

<speaker>PAROLLES</speaker>
An thy mind stand to 't, boy, steal away bravely.

<speaker>BERTRAM</speaker>
I shall stay here the forehorse to a smock,
Creaking my shoes on the plain masonry
Till honor be bought up, and no sword worn
But one to dance with. By heaven, I'll steal away!

<speaker>FIRST LORD</speaker>
There's honor in the theft.

<speaker>PAROLLES</speaker>
Commit it, count.

<speaker>SECOND LORD</speaker>
I am your accessory. And so, farewell.

<speaker>BERTRAM</speaker>
I grow to you, and our parting is a tortured
body.

<speaker>FIRST LORD</speaker>
Farewell, captain.

<speaker>SECOND LORD</speaker>
Sweet Monsieur Parolles.

<speaker>PAROLLES</speaker>
Noble heroes, my sword and yours are kin.
Good sparks and lustrous, a word, good metals.
You shall find in the regiment of the Spinii one
Captain Spurio with his cicatrice, an emblem of
war, here on his sinister cheek. It was this very
sword entrenched it. Say to him I live, and observe
his reports for me.

<speaker>FIRST LORD</speaker>
We shall, noble captain.

<speaker>PAROLLES</speaker>
Mars dote on you for his novices.
[<i>Lords exit.</i>]
[<i>To Bertram.</i>]
What will you do?

<speaker>BERTRAM</speaker>
Stay the King.

<speaker>PAROLLES</speaker>
Use a more spacious ceremony to the noble
lords. You have restrained yourself within the list
of too cold an adieu. Be more expressive to them,
for they wear themselves in the cap of the time;
there do muster true gait; eat, speak, and move
under the influence of the most received star, and,
though the devil lead the measure, such are to be
followed. After them, and take a more dilated
farewell.

<speaker>BERTRAM</speaker>
And I will do so.

<speaker>PAROLLES</speaker>
Worthy fellows, and like to prove most
sinewy swordmen.	[<i>Bertram and Parolles exit.</i>]

[<i>Enter Lafew, to the King.</i>]

<speaker>LAFEW,</speaker>
[<i>kneeling</i>]
Pardon, my lord, for me and for my tidings.

<speaker>KING</speaker>
I'll fee thee to stand up.

<speaker>LAFEW,</speaker>
[<i>standing</i>]
Then here's a man stands that has brought his
pardon.
I would you had kneeled, my lord, to ask me mercy,
And that at my bidding you could so stand up.

<speaker>KING</speaker>
I would I had, so I had broke thy pate
And asked thee mercy for 't.

<speaker>LAFEW</speaker>
Good faith, across.
But, my good lord, 'tis thus: will you be cured
Of your infirmity?

<speaker>KING</speaker>
No.

<speaker>LAFEW</speaker>
O, will you eat
No grapes, my royal fox? Yes, but you will
My noble grapes, an if my royal fox
Could reach them. I have seen a medicine
That's able to breathe life into a stone,
Quicken a rock, and make you dance canary
With sprightly fire and motion, whose simple touch
Is powerful to araise King Pippen, nay,
To give great Charlemagne a pen in 's hand
And write to her a love line.

<speaker>KING</speaker>
What "her" is this?

<speaker>LAFEW</speaker>
Why, Doctor She. My lord, there's one arrived,
If you will see her. Now, by my faith and honor,
If seriously I may convey my thoughts
In this my light deliverance, I have spoke
With one that in her sex, her years, profession,
Wisdom, and constancy hath amazed me more
Than I dare blame my weakness. Will you see her--
For that is her demand--and know her business?
That done, laugh well at me.`;

        const playText = rawPlayText;

        const credits = `All's Well That Ends Well
        by William Shakespeare
        Edited by Barbara A. Mowat and Paul Werstine
          with Michael Poston and Rebecca Niles
        Folger Shakespeare Library
        https://shakespeare.folger.edu/shakespeares-works/alls-well-that-ends-well/
        Created on Mar 14, 2018, from FDT version 0.9.2.2`;

        // Process the text to add line numbers before setting it
        const processedText = addLineNumbers(playText);

        // Replace the entire body content with our new layout
        document.body.innerHTML = `
            <div class="three-pane-layout">
                <div class="sidebar">
                    <div class="icon-container">
                        <img src="shakespeare_icon.png" alt="App Icon" class="sidebar-icon">
                    </div>
                    <div class="sidebar-acts"></div>
                </div>
                <div class="main-content">
                    <div class="cream-pane">
                        <div class="text-content">${processedText}</div>
                    </div>
                    <div class="white-pane">
                        <!-- White pane content -->
                    </div>
                </div>
                <div class="version-number">v1.0.1</div>
            </div>
        `;

        // Add scroll button handlers
        const textContent = document.querySelector('.text-content');

        const scrollAmount = 300; // pixels to scroll

        // Add spinning effect and click handler to sidebar icon
        const sidebarIcon = document.querySelector('.sidebar-icon');

        // Apply the same spinning effect
        sidebarIcon.addEventListener('mouseover', () => handleIconMouseOver(sidebarIcon));
        sidebarIcon.addEventListener('mouseout', () => handleIconMouseOut(sidebarIcon));

        // Add click handler to return to home page
        sidebarIcon.addEventListener('click', function() {
            window.location.reload();
        });

        // Add this line after the innerHTML is set
        updateSidebar(playText, selectedPlay);
    }
});

function updateSelectedItem(newIndex) {
    const items = suggestionsList.querySelectorAll('li');
    items.forEach(item => item.classList.remove('bg-gray-100'));
    
    if (newIndex >= 0 && newIndex < items.length) {
        selectedIndex = newIndex;
        const selectedItem = items[selectedIndex];
        selectedItem.classList.add('bg-gray-100');
        selectedItem.scrollIntoView({ block: 'nearest' });
    }
}

// Event listeners
input.addEventListener('input', (e) => {
    searchOptions(e.target.value);
});

input.addEventListener('focus', () => {
    searchOptions('');
});

input.addEventListener('keydown', (e) => {
    const items = suggestionsList.querySelectorAll('li');
    
    if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
            e.preventDefault();
            items[selectedIndex].click();
            // Trigger the go button if it's enabled
            if (!goButton.disabled) {
                goButton.click();
            }
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateSelectedItem(selectedIndex + 1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateSelectedItem(selectedIndex - 1);
    }
});

document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.classList.add('hidden');
        selectedIndex = -1;
    }
});

const icon = document.querySelector('.icon');
let duration = 3; // Start with 3 seconds per rotation
let animationFrameId = null;
let currentRotation = 0;
let isSpinning = false;

// Helper functions for icon spin animation
function handleIconMouseOver(icon) {
    isSpinning = true;
    function accelerate() {
        if (icon.matches(':hover')) {  // Changed to work with any icon
            duration = Math.max(0.5, duration * 0.99);
            icon.style.animationDuration = duration + 's';
            animationFrameId = requestAnimationFrame(accelerate);
        }
    }
    
    duration = 3;
    icon.style.animation = 'spin ' + duration + 's linear infinite';
    animationFrameId = requestAnimationFrame(accelerate);
}

function handleIconMouseOut(icon) {
    cancelAnimationFrame(animationFrameId);
    
    function decelerate() {
        duration = Math.min(5, duration * 1.01);
        icon.style.animationDuration = duration + 's';
        
        if (duration < 5) {
            animationFrameId = requestAnimationFrame(decelerate);
        } else {
            cancelAnimationFrame(animationFrameId);
            icon.style.animation = 'none';
            setTimeout(() => {
                isSpinning = false;
            }, 500);
        }
    }
    
    animationFrameId = requestAnimationFrame(decelerate);
}

// Landing page icon event listeners
icon.addEventListener('mouseover', () => handleIconMouseOver(icon));
icon.addEventListener('mouseout', () => handleIconMouseOut(icon));

icon.addEventListener('click', function(e) {
    const rect = icon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Increased to 45 particles
    for (let i = 0; i < 45; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        // Increased size to 35px
        particle.style.width = '35px';
        particle.style.height = '35px';
        particle.style.backgroundImage = `url(${icon.src})`;
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        document.body.appendChild(particle);

        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 100 + Math.random() * 100;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const rotation = (Math.random() - 0.5) * 720;

        requestAnimationFrame(() => {
            particle.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotation}deg)`;
            particle.classList.add('exploded');
        });

        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1000);
    }

    icon.style.opacity = '0';
    setTimeout(() => {
        icon.style.display = 'none';
    }, 100);
});

function updateSidebar(playText, selectedPlay) {
    // First, process the text to add line numbers
    const processedText = addLineNumbers(playText);
    
    const sidebar = document.querySelector('.sidebar-acts');
    
    // Clear existing content
    while (sidebar.children.length > 0) {
        sidebar.removeChild(sidebar.lastChild);
    }
    
    // Add play title
    const playTitle = document.createElement('div');
    playTitle.className = 'act-item play-title';
    playTitle.style.cursor = 'default';
    playTitle.style.pointerEvents = 'none';
    playTitle.style.backgroundColor = 'transparent';
    playTitle.textContent = selectedPlay;
    sidebar.appendChild(playTitle);
    
    // Create acts container
    const actsContainer = document.createElement('div');
    actsContainer.className = 'sidebar-acts';
    
    // Track all acts and their scenes
    const acts = [];
    let currentAct = null;
    let actCount = 0;
    let sceneCount = 0;
    
    const lines = processedText.split('\n');
    lines.forEach((line) => {
        // Check for Act headers
        if (line.includes('class="act-header"')) {
            actCount++;
            sceneCount = 0;  // Reset scene count for new act
            const actDiv = document.createElement('div');
            actDiv.className = 'act-item';
            const actText = line.replace(/<\/?b[^>]*>/g, '').trim();
            actDiv.textContent = actText;
            
            const actNumber = actCount; // Use actCount directly instead of parsing text
            
            const scenesContainer = document.createElement('div');
            scenesContainer.className = 'scenes-container';
            
            actDiv.onclick = () => {
                const target = document.querySelector(`#act-${actNumber}`);
                if (target) {
                    selectAct(actNumber);
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            };
            
            acts.push({ div: actDiv, scenes: scenesContainer });
            actsContainer.appendChild(actDiv);
            actsContainer.appendChild(scenesContainer);
            currentAct = { div: actDiv, scenes: scenesContainer };
        }
        // Check for Scene headers
        else if (line.includes('class="scene-header"') && currentAct) {
            sceneCount++;
            const sceneDiv = document.createElement('div');
            sceneDiv.className = 'scene-item';
            sceneDiv.textContent = line.replace(/<\/?b[^>]*>/g, '').trim();
            
            // Store the current act and scene numbers in closure
            const thisAct = actCount;
            const thisScene = sceneCount;
            
            sceneDiv.onclick = () => {
                const target = document.querySelector(`#act-${thisAct}-scene-${thisScene}`);
                if (target) {
                    selectAct(thisAct, thisScene);
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            };
            currentAct.scenes.appendChild(sceneDiv);
        }
    });
    
    if (actsContainer.children.length > 0) {
        sidebar.appendChild(actsContainer);
    }
    
    // Add scroll detection
    const textContent = document.querySelector('.text-content');
    textContent.addEventListener('scroll', _.throttle(() => {
        updateActiveActFromScroll(acts);
    }, 100));
    
    // Initial selection - select Act 1 and show its scenes
    selectAct(1);
    const firstScenesContainer = document.querySelector('.scenes-container');
    if (firstScenesContainer) {
        firstScenesContainer.style.display = 'block';
    }
}

function selectAct(actCount, sceneCount = null) {
    // Remove all active states
    document.querySelectorAll('.act-item, .scene-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Hide all scenes containers first
    document.querySelectorAll('.scenes-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // Mark active act and show its scenes
    const actItems = document.querySelectorAll('.act-item');
    const scenesContainers = document.querySelectorAll('.scenes-container');
    
    // Skip the play title when selecting acts
    const actIndex = actCount;  // Changed from actCount - 1
    const targetAct = Array.from(actItems).find((item, index) => 
        index > 0 && item.textContent.includes(`Act ${actCount}`));
    
    if (targetAct) {
        targetAct.classList.add('active');
        // Find the scenes container that comes after this act
        const targetScenesContainer = targetAct.nextElementSibling;
        if (targetScenesContainer && targetScenesContainer.classList.contains('scenes-container')) {
            targetScenesContainer.style.display = 'block';
            
            if (sceneCount !== null) {
                const sceneItems = targetScenesContainer.querySelectorAll('.scene-item');
                const targetScene = Array.from(sceneItems).find(item => 
                    item.textContent.includes(`Scene ${sceneCount}`));
                if (targetScene) {
                    targetScene.classList.add('active');
                }
            }
        }
    }
}

function updateActiveActFromScroll(acts) {
    const textContent = document.querySelector('.text-content');
    const scrollPosition = textContent.scrollTop;
    const viewportHeight = textContent.clientHeight;
    const buffer = viewportHeight * 0.2; // 20% buffer zone
    
    let mostVisibleAct = 1;
    let mostVisibleScene = 1;
    let maxVisibility = 0;
    
    // First find all scene elements and check their visibility
    for (let act = 1; act <= acts.length; act++) {
        const actScenes = document.querySelectorAll(`[id^="act-${act}-scene-"]`);
        actScenes.forEach((sceneElement) => {
            const rect = sceneElement.getBoundingClientRect();
            
            // Calculate visibility with a bias towards elements near the top of the viewport
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const elementHeight = rect.height;
            
            // Give more weight to elements near the top of the viewport
            let visibility = 0;
            if (elementTop < buffer && elementBottom > 0) {
                // Element is near the top of viewport
                visibility = elementHeight + (buffer - elementTop);
            } else if (elementTop >= 0 && elementTop < viewportHeight) {
                // Element is in viewport but not at top
                visibility = Math.min(elementBottom, viewportHeight) - elementTop;
            }
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                const [, actNum, , sceneNum] = sceneElement.id.split('-');
                mostVisibleAct = parseInt(actNum);
                mostVisibleScene = parseInt(sceneNum);
            }
        });
    }
    
    // Only update if we found a visible scene
    if (maxVisibility > 0) {
        selectAct(mostVisibleAct, mostVisibleScene);
    }
}

function addLineNumbers(playText) {
    const lines = playText.split('\n');
    let currentLineNumber = 0;
    let inScene = false;
    let processedLines = [];
    
    for (let line of lines) {
        // Skip empty lines
        if (!line.trim()) {
            processedLines.push(line);
            continue;
        }

        // If this is a scene header, reset line counter
        if (line.includes('class="scene-header"')) {
            currentLineNumber = 0;
            inScene = true;
            processedLines.push(line);
            continue;
        }
        
        // Skip headers, stage directions, and HTML elements
        if (line.includes('class="act-header"') || 
            line.includes('<hr>') ||
            line.trim().startsWith('<') ||
            line.trim().startsWith('[')) {
            processedLines.push(line);
            continue;
        }
        
        // If we're in a scene and the line has actual text content
        if (inScene && line.trim()) {
            currentLineNumber++;
            // Only show line numbers for every 5th line
            const lineNumber = currentLineNumber % 5 === 0 ? currentLineNumber : '&nbsp;&nbsp;&nbsp;';
            // Add the line number in a span with right padding
            processedLines.push(`<span class="line-number">${lineNumber}</span>${line}`);
        } else {
            processedLines.push(line);
        }
    }
    
    return processedLines.join('\n');
}
