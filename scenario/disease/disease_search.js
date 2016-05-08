function(doc){
	var twitter_text = doc.text
	disease_list = ['thyroid', 'multiple', 'respiration', 'bone,', 'deafness', 'leukaemias', 'prosthesis', 'musculo', 'clotting', 'research', 'depression', 'osteoporosis', 'nursing', 'skeletal', 'bowel', 'general', 'mellitus', 'behaviours', 'fatigue', 'cortex', 'bacteriology', 'cataracts', 'nervous', 'atherosclerosis', 'cultural', 'gastrointestinal', 'international', 'subcutaneous', 'on', 'biology', 'immunology', 'methods', 'biostatistics', 'of', 'hearing', 'joint', 'therapy', 'liver', 'birth', 'pregnancy', 'alternative', 'injury', 'or', 'colitis', 'inflammatory', 'renal', 'disorders', 'cardiology', 'defects/thrombosis', 'qualitative', 'epilepsy', 'sclerosis', 'arrhythmias', 'poisoning', 'pituitary', 'nephrology', 'promotion', 'ulcer', 'urinary', 'biology', 'chemistry', 'biochemistry', 'veneral', 'disability', 'heart', 'coronary', 'chronic', 'insemination', 'syphilis', 'behavioural', 'male', 'vision', 'function', 'pharmaceutical', 'science', 'lateral', 'regeneration', 'stroke', 'gastro-intestinal', 'lung', 'affecting', 'obesity', 'molecular', 'occupational', 'cardiovascular', 'bioinformatics', 'non', 'muscle', 'amyotrophic', 'glaucoma', 'genomicsproteomics', 'alzheimer', 'anomalies', 'infarction', 'hypertension', 'mental', 'res', 'lupus', 'muscular', 'transplantation', 'parkinson', 'adhd', 'services', 'aids', 'duodenal', 'accidents', 'cochlear', 'congenital', 'carcinogens', 'lipoproteins', 'syndrome', 'drugs', 'endocrinology', 'tumors', 'infectious', 'artificial', 'brain', 'genetics', 'medicine', 'bone', 'imaging', 'cord', 'and', 'organic', 'circulation', 'parasitic', 'perinatal', 'epidemiology', 'deficit', 'parathyroid', 'determinants', 'huntington', 'oral', 'care', 'psychosocial', 'virology', 'arthritis', 'bladder', 'failure', 'reproduction', 'adrenal', 'metabolism', 'transport', 'use', 'neoplasms', 'diseases', 'infertility', 'viral', 'medical', 'economics', 'dimensions', 'emphysema', 'osteoarthritis', 'urology', 'autism', 'myocardial', 'obstructive', 'tissus', 'lipid', 'violence', 'anaemias', 'drug', 'cell', 'environmental', 'schizophrenia', 'speech', 'blood', 'malnutrition', 'equity', 'policy', 'sleep', 'population', 'psycho-social', 'gastric', 'cns', 'cancer', 'nutrition', 'dental', 'dystrophy', 'disease', 'societal', 'biophysics', 'delivery', 'pneumonia', 'other', 'breast', 'female', 'skin', 'prostate', 'diabetes', 'asthma', 'spinal', 'hyperactivity', 'attention', 'system', 'genito', 'health', 'influences', 'ileitis', 'disorder']
	for (var i = 0; i<disease_list.length; i++){
		disease_regexp = new RegExp(disease_list[i], 'gi')
		result = twitter_text.match(disease_regexp)
		if (result != null){
			if (doc.coordinates != null){
			  emit(doc.id_str, doc);
			}
		}
	}
}

