import * as yaml from 'js-yaml';
import * as fs from 'fs';

export async function calculateYamlCoverage(filePath: string) {
  const obj = yaml.load(fs.readFileSync(filePath, {encoding: 'utf-8'}));
  const pages = JSON.parse(JSON.stringify(obj, null, 2));
  calculateCoverage(pages);
}

let totalProductFeatures = 0;
let coveredProductFeatures = 0;
let totalPageFeatures = 0;
let coveredPageFeatures = 0;

function calculateCoverage(pages) {
  let output = '';

  pages.forEach(page => {
    iterateThroughFeature(page.features);

    const pageCoverage = `${page.page} page has ${
      Math.round((coveredPageFeatures / totalPageFeatures) * 100 * 100) / 100
    }% coverage`;
    output += pageCoverage + '\n';
    console.log(pageCoverage);

    // resetting count for the current page
    totalPageFeatures = 0;
    coveredPageFeatures = 0;
  });

  const totalCoverage = `\nTotal Product coverage is: ${
    Math.round((coveredProductFeatures / totalProductFeatures) * 100 * 100) /
    100
  }%\n`;
  output += totalCoverage;
  console.log(totalCoverage);
  fs.writeFileSync('coverage-output.txt', output);
}

function iterateThroughFeature(feature) {
  Object.entries(feature).forEach(([key, value]) => {
    if (typeof value === 'object') {
      iterateThroughFeature(feature[key]);
    } else {
      addCount(value);
    }
  });
}

// since value will be either true of false based on that we add to features or coverage
function addCount(value) {
  if (value) {
    totalPageFeatures++;
    coveredPageFeatures++;
    totalProductFeatures++;
    coveredProductFeatures++;
  } else {
    totalPageFeatures++;
    totalProductFeatures++;
  }
}
