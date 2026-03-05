# Fee Guide Refinery Implementation Plan

### 1. Data Processing Architecture (Complete)
- [x] Establish a "two-pass" processing system
- [x] Pass 1: "Stitcher" (`merge_rows`) handles broken and multi-line descriptive text securely via a buffered loop.
- [x] Pass 2: "Yeet & Squash" (`parse_rows`) handles data extraction by sniffing elements (`re.findall`), destroying those elements (`re.sub`), and squashing the holes.
- [x] Implement Python explicit typing for all input variables.

### 2. Regex Engine Architecture (Complete)
- [x] Migrate abstract patterns (like integers with commas) outside the domain logic (`regex_patterns.py`).
- [x] Implement nested dictionary structures to maintain regex string literals securely.
- [x] Utilize fast, targeted lookup strings exclusively instead of monolithic, rigid standard rows.

### 3. Data Models (Complete)
- [x] Define `Procedure` model using Pydantic.
- [x] Define `Category` model using Pydantic (with recursive children nodes).

### 4. Error Handling & Frontend Logging (TODO)
- [ ] Refactor `parse_rows` or a wrapper function to return a structured response dictionary: `{"data": [...], "logs": [...]}`.
- [ ] Implement Parsing Logs: Push a warning to the `logs` array if `fee_list` extracts > 2 fees.
- [ ] Ensure the application gracefully degrades and recovers by still returning `fee_min` and `fee_max`.
- [ ] Frontend Implementation: Ensure the React UI consumes `response.logs` and triggers a user-facing Warning Modal if the array is > 0.

### 5. Final Integration Testing (TODO)
- [ ] Build a runner script to ingest `dumped_output.txt`.
- [ ] Verify execution time and string outputs.
- [ ] Verify Pydantic structural integrity.
