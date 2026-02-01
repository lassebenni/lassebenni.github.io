---
title: "SELECT * FROM WEEK (2)"
date: 2026-01-30T19:21:55+01:00
draft: false
ai_summary: "This second edition explores the power of single-machine compute with DuckDB, the evolution of RDBMS architecture, and why unstructured 'decision traces' might be the next big data moat. We also dive into the future of columnar storage beyond Parquet and discuss the shifting landscape of computer science education in the agentic era."
tags: ["duckdb", "data-engineering", "parquet", "llm", "architecture"]
---

Another week, another `select *`! Let's dive in.

## Projects

{{% accordion title="GammaVibe architecture video" level="3" summary="Mirko's YouTube walkthrough of the GammaVibe architecture, showcasing the AI agent chain for news extraction and startup idea generation." %}}

![GammaVibe Architecture](image-1.png)

After my last weekly blog on GammaVibe (the Startup-idea-generator-as-a-newsletter-service), it's creator Mirko has added a new YT video-walkthrough of the architecture. In this video he goes into the details of the setup that extracts news from the EventRegistry news API's and goes through a rigorous chain of events that bundles this information using AI agents into, well, the startup idea. Impressive to see all the different stages, very helpful as target-architecture. I was heavily inspired by it to create my own "news-ingestion service", which I might share later on.

{{< youtube YAFdxO8jANc >}}

{{% /accordion %}}

# Videos

{{% accordion title="Professor Hannes Mühleisen: Leading the DuckDB Revolution" level="3" summary="A profile of Hannes Mühleisen, DuckDB Labs CEO and Professor of Data Engineering, highlighting his impressive track record in database research and open-source contributions." %}}

I have been watching some of the [DuckDB's Labs CEO's](https://github.com/duckdb/duckdb) excellent (although older) talks on YouTube this week. I've actually met [Hannes Mühleisen](https://hannes.muehleisen.org/) when he came to visit to one of our knowledge sharing events at Xebia in Amsterdam when I worked there. A very friendly, witty and smart guy with an [impressive track record at the "ivy league" universities of the Netherlands](https://www.cwi.nl/en/people/hannes-muehleisen/) (similarily incubated at Amsterdam's Centrum Wiskunde & Informatica, CWI, [as another fellow you might now](https://gvanrossum.github.io/bio.html)) .

Starting first as a researcher of database architectures and since last year a [Professor of Data Engineering](https://www.cwi.nl/en/news/hannes-m%C3%BChleisen-appointed-as-professor-at-radboud-university/) (I didn't even know that was a thing), while also juggling such details as leading a [startup](https://duckdblabs.com/) with his [PhD student-turned-co-founder Mark Raasveldt](https://mytherin.github.io/) , one of the most [explosively growing open-source databases](https://duckdb.org/2025/10/09/benchmark-results-14-lts) in the world, which in turn [spawned a whole company](https://motherduck.com/blog/hello-world/) , both of which employ some of my former Xebia colleagues now. I'm proud that we have a Netherlands-based founder with such a large contribution to the data engineering/analysis work-field in these jingoistic times. Keep up the good work Professor!

Now onto the talks I watched:

## A Short Summary of the Last Decades of Data Management • Hannes Mühleisen • GOTO 2024

![Hannes Mühleisen • GOTO 2024](image-2.png)

- <https://www.youtube.com/watch?v=-wCzn9gKoUk>

{{< youtube -wCzn9gKoUk >}}

In this talk, Hannes goes over the history of information systems (databases), it's real fun talk that demonstrates his ability to make a walk through "dry" subjects as IT systems history engaging (well for me at least, although I might be biased). I think it's a must-watch for DE's (and anyone working with databases) new to the game, since it's a condensed history of our working-field and the different types of databases, although it's end is slightly tilted towards vendor-speak (duckdb-can-do-all-of-this-for-you).

- I especially like this "subway-map" style visual of the evolution of RDBMS systems over time, which I had never seen before.
     ![Genealogy of Relational Database Management Systems](image-3.png) - Genealogy of Relational Database Management Systems (1970s - 2010s)

- And I like this graphical representation of Analytical vs Transactional data systems as seen from the aspect of the the data. ![Analytical vs Transactional data systems](image-4.png) The colors basically indicate the grouping of the data on-disk (or wherever it lives), either in rows-groups or in column-groups, and this little change introduces all kinds of technical challenges that the OLAP/OLTP architectures have to solve.

Some quotes I liked:

- "No SQL was a really bad idea, because relational systems will be inevitable if you make data systems."
- "If your problem can be reduced to a two-column table, then you can use a relational database." So according to Hannes, no need for separate graph, vector, document, time-series optimized databases if we can just do it in duckdb.

![Relational Database Architecture](image-5.png)
{{% /accordion %}}

{{% accordion title="Keynote: Data Architecture Turned Upside Down" level="3" summary="Hannes Mühleisen's PyData Amsterdam keynote on the power of commodity hardware and the shift towards single-machine compute for modern data architecture." %}}

### KEYNOTE: Hannes Mühleisen - Data Architecture Turned Upside Down | PyData Amsterdam 2025

Basically the talk boils down to this quote by Hannes: "What you can do on a single machine is *insane*" (on the power of single-node compute nowadays).

![PyData Amsterdam 2025](image-6.png)
<https://www.youtube.com/watch?v=DxwDaoUijTc>  

{{< youtube DxwDaoUijTc >}}

The second talk (simiarily free on YouTube) is more recent, and starts as an attack on the established database vendors (Oracle) and their price-gouging ways. Hannes argues during the talk that the old way of the world where the database vendor is effectively "holding your data hostage" are over, and due to the explosive growth of the capabilities of "small" compute has overgrown the requirements of data storage (e.g. the size of data that *most* companies store *has not* grown as much compared to the previous years , in contrast to the price of compute, storage and networking, which *has* radically maybe even exponentially reduced over the last decade. This means that it shouldn't actually make sense to be paying the same prices for databases as in the years before, and you probably don't even need the most powerful state-of-the-art distributed systems for it either.

Which is basically [duckdb's](https://github.com/duckdb) slogan: "You don't have big data, so stop paying for it". During the talk Hannes demoes an aggregation query, (distinct values in a field) over a dataset of 256GB (a billion rows), on a machine with only 2GBs of memory. So the dataset is bigger than memory and would have to spill on disk normally. It completes within one minute(!). Shows the impressive results of their optimized in-memory database (duckdb) on less than impressive hardware, by current standards.

![DuckDB Aggregation Demo](image-7.png)

Some other interesting things in the talk:

- According to Snowflake and Redshift, the median data scanned in a query is only 100MB. How's that for small data. Which further cements his point that most companies are not dealing in "big data" (or at least not actively querying it).
    ![Small Data Statistics](image-8.png)
- The evolution of data architecture according to Hannes:
- 1985: "Clients didn't have much to say."
    ![Data Architecture 1985](image-9.png)
- 2015: "Didn't change a whole lot, just in the Cloud."
    ![Data Architecture 2015](image-10.png) - 2025: "Storage and metadata is an afterthought and the client is the "empowered user. [...] "
- "Data that you create locally stays on your device. Transformations run on your device. But we keep cohesion with commoditized storage (s3) and metadata (iceberg) to keep data from your local devices in sync across devices, but without a centralized datawarehouse."
- "Google created a business model by combining commodity hardware and distributed compute": (MapReduce + Hadoop.
- "Client usecases: duckdb on lambda, on application servers. Duckdb on sattelites, comms is expensive so process locally."

It's a great, fun talk on the power of commodity hardware in 2025 (or 2026), but instead of going with the Hadoop route of connecting all this commodity hardware together in a complex distributed system of nodes and orchestrators (introduced as Hadoop in 2003), Hannes is arguing the point of going to the *other route* of just running it wherever you have compute on a single machine (could be in the browser, could be mobile phone, could be in an edge device). As long as that your data is not *big*, which it rarely is for most usecases. If you go by the popular saying of *as long as it fits on a laptop, it's not big data*, then duckdb just stretched that axiom a *BILLION* rows further.

Somewhat curiously, but also expected, we have Motherduck pointing out that if you do actually need distributed cloud compute (which is ironically the opposite of Hannes' *original* single-machine propaganda), you can get best of both worlds with their services. For a long time I thought it was counterintuitive: why mix local and external data sources with a shared compute layer, seems like a recipe for trouble. But given the popularity of both duckdb and motherduck, I think it's not a fad at all and might prove a worthy competitor to SF and dbx. However, I also foresee a lot of headscratching by DE's/AE's wondering which dbt table they actually queried.. the local one or the cloud one. But then again, LLM's don't have heads to scratch. Yet.

{{% /accordion %}}

## Articles

- [Have you tried a text box - by Benn Stancil](https://benn.substack.com/p/have-you-tried-a-text-box?utm_source=tldrdata#footnote-1-183276617) - As usual, Benn raises interesting points. What if, instead of trying to "hardcode business decisions", we just handed the LLM's the real, raw context of an organization in voicenotes and let it derive the insights, perhaps these models are already smarter we could dream of? How would we even know?

  > [URL](https://benn.substack.com/p/have-you-tried-a-text-box?utm_source=tldrdata#footnote-1-183276617)
  > 
  > "Me: I mean, no, you’re right, you’re asking me a question about nuanced analysis, and I said, have you tried pasting everything in a text box? That was dumb."
  > 
  > "People said we need to model how organizations make decisions. We need to keep track of every action’s inputs, its outputs, and its relationships to other organizational behaviors"
  > 
  > "But if two companies handed their decision-making over to ChatGPT, which one would you bet on? The one that attempted to map every email, Slack message, and database entity into a complex ontological simulacrum and a “semantic mesh,” or the one that figured out how to collect a giant folder full of transcribed voice notes of people describing why they did everything they did?"
  > 
  > "Which one would you trust more: Our ability to model how 1,000 people collectively think, or a state-of-the-art AI, looking for patterns in a large corpus of unstructured text?"

- [Where AI is headed in 2026 - Foundation Capital](https://foundationcapital.com/where-ai-is-headed-in-2026/) - A quote from the predictions: "Today, most AI interfaces wait for you to ask. But the best employees don’t work that way: they observe the situation, propose a solution, and ask for sign-off.".

  > [URL](https://foundationcapital.com/where-ai-is-headed-in-2026/)
  > 
  > "🧠 Prediction 2: Decision traces become the new data moat"
  > 
  > "When an agent executes a workflow, it pulls context from multiple systems, applies rules, resolves conflicts, routes exceptions, and acts. Most AI systems discard all of that the moment the task is complete. But if you persist the decision trace – what inputs were gathered, what policies applied, what exceptions were granted, and why – you end up with something enterprises almost never have: a structured, replayable history of how context turned into action."
  > 
  > "Startups have a structural advantage here. Because they sit in the execution path, they see the full context at decision time. Incumbents are either siloed or in the read path rather than the write path (data warehouses receive information via ETL after decisions are made – by then, the decision context is gone)."
  > 
  > "Today, most AI interfaces wait for you to ask. But the best employees don’t work that way: they observe the situation, propose a solution, and ask for sign-off."

- [Column Storage for the AI Era](https://sympathetic.ink/2025/12/11/Column-Storage-for-the-AI-era.html) - Parquet's origins elegantly explained by the PMC Chair. To be honest, I never had any idea of how a [Apache Project Management Committee](https://www.apache.org/dev/pmc.html) worked, let alone the one for our beloved king of formats, Apache Parquet. But the king is under siege, as kings often are. Will they be overtaken? Or will they adapt and keep their throne in the agentic-era?

  > [URL](https://sympathetic.ink/2025/12/11/Column-Storage-for-the-AI-era.html)
  > 
  > "In the past few years, we’ve seen a cambrian explosion of new columnar formats, challenging the hegemony of Parquet: Lance, Fastlanes, Nimble, Vortex, AnyBlox, F3 (File Format for the Future). The thinking is that the context has changed so much that the design of yore (the previous decade) is not going to cut it moving forward."
  > 
  > "You might think Parquet is a file format. But Parquet is, first and foremost, an open-source project. It’s a consensus building machine"

- <https://adocomplete.com/advent-of-claude-2025/> - The best cheatsheet for Claude Code I've seen to date.

- <https://www.reddit.com/r/cscareerquestions/comments/1qian6p/cs_student_here_no_one_i_know_actually_writes/>
![Reddit: CS Careers](image-11.png)
- Came across this Reddit thread, think it's a good insight into what the future holds. Will CS grads still really need to code to provide business value? Will high-level languages go like the way of assembly? And will software engineering transition into an all-day long guessing game to [figure out if your brilliant intern is deceiving you](https://www.anthropic.com/research/alignment-faking)? Will a new upperclass arise that *manages* the models while the rest of us drink from their fountains, or did that already happen?  

![Reddit: AI alignment](image-12.png)

- Anyways, it feels that Reddit's opinion is that this is *a big mistake* and students are making themselves unemployable. Perhaps. Or perhaps it will go the way of the sage wisdom of the 70s of "You can't bring a calculator everywhere you go you know." We actually *could* and we actually *did* and we acually *will* keep bringing our calculators everywhere go and [look at them non-stop for up to 10 hours a day](https://www.mastermindbehavior.com/post/average-screen-time-statistics), thank you very much.

That's all, till the next one!
