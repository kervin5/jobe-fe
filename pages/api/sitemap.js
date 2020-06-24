import { SitemapStream, streamToPromise } from "sitemap";
import axios from "axios";
import glob from "glob";
import fs from "fs";
import path from "path";
import getBackendUrl from "@/lib/backend";

const SITE_ROOT = process.env.SITE_ROOT || "https://www.myexactjobs.com";

const API_SOURCE = getBackendUrl();
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const SOURCE =
  process.env.SOURCE || path.join(resolveApp("pages"), "/**/!(_*).js");

export default async (req, res) => {
  res.setHeader("Content-Type", "text/xml");
  try {
    const jobs = await fetchContentFromAPI(); // call the backend and fetch all jobs

    const smStream = new SitemapStream({
      hostname: "http://" + req.headers.host
    });

    let diskPages = glob.sync(SOURCE);

    diskPages.forEach(page => {
      if (
        !page.includes("[") &&
        !page.includes("dashboard") &&
        !page.includes("api")
      ) {
        let stats = fs.statSync(page);
        let modDate = new Date(stats.mtime);
        let lastMod = `${modDate.getFullYear()}-${(
          "0" +
          (modDate.getMonth() + 1)
        ).slice(-2)}-${("0" + modDate.getDate()).slice(-2)}`;

        page = page.replace(resolveApp("pages"), "");
        page = page.replace(/.js$/, "");
        page = page.split("/pages").pop();
        page = `${SITE_ROOT}${page}`;
        page = page.trimRight("/");

        if (page.match(/.*\/index$/)) {
          page = page.replace("/index", "");
        }

        smStream.write({
          url: page,
          lastmod: lastMod
        });
      }
    });

    for (const job of jobs) {
      smStream.write({
        url: `${SITE_ROOT}/jobs/${job.title.replace(
          /[\W_]+/g,
          "-"
        )}-${job.location.name.replace(/[\W_]+/g, "-")}-${job.id}`,
        lastmod: job.updatedAt
      });
    }

    smStream.end();
    const sitemap = await streamToPromise(smStream).then(sm => sm.toString());
    res.write(sitemap);
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }
};

async function fetchContentFromAPI() {
  const result = await axios.post(API_SOURCE, {
    query: `{
        jobs {
            id 
            title
            updatedAt
            location {
                name
            }
        } 
      }`
  });
  return result.data.data.jobs;
}
