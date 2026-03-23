import { summarize } from '../llm/summarizer.js';
import { loadHistory, getRecentTitles, saveHistory } from './history.js';
import { buildCompanyCaseStudyPrompt, buildConceptPrompt } from './prompt.js';
import fs from 'fs';

function extractJson(response) {
  let json = response.trim();
  
  // If response starts with {, it's already JSON
  if (json.startsWith('{')) {
    return json;
  }
  
  // If wrapped in ```json code block
  if (json.includes('```json')) {
    json = json.split('```json')[1].split('```')[0];
    return json.trim();
  }
  
  // If wrapped in generic ``` code block
  if (json.includes('```')) {
    json = json.split('```')[1].split('```')[0];
    return json.trim();
  }
  
  return json;
}

async function generateCaseStudy() {
  console.log('Loading history...');
  const history = loadHistory();
  const recentTitles = getRecentTitles(history, 20);
  
  console.log(`Found ${history.length} previous case studies`);
  if (recentTitles.length > 0) {
    console.log(`Last topic: ${recentTitles[recentTitles.length - 1]}`);
  }
  
  // Generate #1: Company Case Study
  console.log('\n=== Generating Company Case Study ===');
  const prompt1 = buildCompanyCaseStudyPrompt(recentTitles);
  const response1 = await summarize(prompt1);
  const companyCaseStudy = JSON.parse(extractJson(response1));
  
  console.log(`✓ Generated: ${companyCaseStudy.title}`);
  console.log(`  Company: ${companyCaseStudy.company}`);
  
  // Update history with first one
  saveHistory(history, companyCaseStudy);
  
  // Generate #2: System Design Concept
  console.log('\n=== Generating System Design Concept ===');
  const updatedHistory = loadHistory();
  const updatedTitles = getRecentTitles(updatedHistory, 20);
  const prompt2 = buildConceptPrompt(updatedTitles);
  const response2 = await summarize(prompt2);
  const concept = JSON.parse(extractJson(response2));
  
  console.log(`✓ Generated: ${concept.title}`);
  
  // Save both to output file
  const output = {
    companyCaseStudy: companyCaseStudy,
    concept: concept,
    generatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync('case-study.json', JSON.stringify(output, null, 2));
  console.log('\n✓ Saved both to case-study.json');
  
  // Update history with second one
  const finalHistory = loadHistory();
  saveHistory(finalHistory, concept);
  console.log('✓ History updated with both entries');
}

generateCaseStudy().catch(err => {
  console.error('Error generating case study:', err);
  process.exit(1);
});
